import React, { useContext, useEffect, useState } from "react";
import ProviderContext from "../common/ProviderContext";
import SmartnosisApi from "../api";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import Grid from "@mui/material/Grid";

function PDF() {
  const { currProvider } = useContext(ProviderContext);
  const [intake, setIntake] = useState(null);

  useEffect(() => {
    async function getIntake() {
      let res = await SmartnosisApi.getIntake(currProvider.id, 1);
      console.log(res);
      setIntake(res);
    }
    getIntake();
  }, []);

  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  });

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "Oswald",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Oswald",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    sect: {
      marginBottom: 1,
      marginTop: 10,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
      textDecoration: "underline",
    },
    reg: {
      margin: 1,
      fontSize: 14,
      textAlign: "justify",
      textDecoration: "underline",
      fontFamily: "Times-Roman",
    },
    top: {
      margin: 1,
      fontSize: 12,
      textAlign: "right",
      fontFamily: "Times-Roman",
    },
    image: {
      // marginVertical: 15,
      marginHorizontal: 200,
      width: "25%",
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });

  return !intake ? null : (
    <Grid item xs={12} md={8} lg={10} height={"85vh"}>
      <PDFViewer width={"100%"} height={"100%"}>
        <Document>
          <Page style={styles.body}>
            <Image style={styles.image} src="/smartnosis-logo.jpg" />

            <Text style={styles.top}>
              Date: {new Date(intake.submittedAt * 1000).toLocaleDateString()}
            </Text>
            <Text style={styles.top}>Insurance: {intake.insurance}</Text>
            <Text style={styles.top}>Primary Phone: {intake.phone}</Text>
            <Text style={styles.top}>Patient Email:</Text>
            <Text style={styles.top}>Patient Address: {intake.address1}</Text>
            <Text style={styles.sect}>
              Patient Name:
              {` ${intake.firstName} ${
                intake.middleName ? intake.middleName + " " : ""
              }${intake.lastName}`}
            </Text>
            <Text style={styles.reg}>D.O.B: {intake.dob}</Text>
            <Text style={styles.reg}>Sex: {intake.sex}</Text>
            <Text style={styles.sect}>Reason for Visit:</Text>
            {intake.symptoms.length
              ? intake.symptoms.map((s) => (
                  <Text style={styles.reg} key={s}>
                    * {s}
                  </Text>
                ))
              : null}
            <Text style={styles.sect}>Patient Health History:</Text>
            {intake.conditions.length
              ? intake.conditions.map((s) => (
                  <Text style={styles.reg} key={s}>
                    * {s}
                  </Text>
                ))
              : null}
            {/* <Text style={styles.title}>Don Quijote de la Mancha</Text>
          <Text style={styles.author}>Miguel de Cervantes</Text> */}
            {/* <Image style={styles.image} src="/images/quijote1.jpg" /> */}
            {/* <Text style={styles.subtitle}>
            Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo
            D. Quijote de la Mancha
          </Text> */}
            {/* <Text style={styles.text}>
              En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no
              ha mucho tiempo que vivía un hidalgo de los de lanza en astillero,
              adarga antigua, rocín flaco y galgo corredor. Una olla de algo más
              vaca que carnero, salpicón las más noches, duelos y quebrantos los
              sábados, lentejas los viernes, algún palomino de añadidura los
              domingos, consumían las tres partes de su hacienda. El resto della
              concluían sayo de velarte, calzas de velludo para las fiestas con
              sus pantuflos de lo mismo, los días de entre semana se honraba con
              su vellori de lo más fino. Tenía en su casa una ama que pasaba de
              los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo
              de campo y plaza, que así ensillaba el rocín como tomaba la
              podadera. Frisaba la edad de nuestro hidalgo con los cincuenta
              años, era de complexión recia, seco de carnes, enjuto de rostro;
              gran madrugador y amigo de la caza. Quieren decir que tenía el
              sobrenombre de Quijada o Quesada (que en esto hay alguna
              diferencia en los autores que deste caso escriben), aunque por
              conjeturas verosímiles se deja entender que se llama Quijana; pero
              esto importa poco a nuestro cuento; basta que en la narración dél
              no se salga un punto de la verdad
            </Text> */}
            {/* <Text style={styles.header} fixed>
              Powered by Smartnosis
            </Text> */}
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `Powered by Smartnosis
                ${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
        </Document>
      </PDFViewer>
    </Grid>
  );
}
export default PDF;
