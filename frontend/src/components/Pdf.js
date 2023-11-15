import React from "react";
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
import { height, minHeight } from "@mui/system";

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// Create Document Component
const Quixote = () => (
  <Grid item xs={12} md={8} lg={10} height={"85vh"}>
    <PDFViewer width={"100%"} height={"100%"}>
      <Document>
        <Page style={styles.body}>
          <Image style={styles.image} src="/smartnosis-logo.jpg" />

          <Text style={styles.header} fixed>
            ~ Created with react-pdf ~
          </Text>
          <Text style={styles.top}>Date:</Text>
          <Text style={styles.top}>Insurance:</Text>
          <Text style={styles.top}>Primary Phone:</Text>
          <Text style={styles.top}>Patient Email:</Text>
          <Text style={styles.top}>Patient Address:</Text>
          <Text style={styles.sect}>Patient Name:</Text>
          <Text style={styles.reg}>D.O.B:</Text>
          <Text style={styles.reg}>Sex:</Text>
          <Text style={styles.sect}>Reason for Visit:</Text>

          {/* <Text style={styles.title}>Don Quijote de la Mancha</Text>
          <Text style={styles.author}>Miguel de Cervantes</Text> */}
          {/* <Image style={styles.image} src="/images/quijote1.jpg" /> */}
          {/* <Text style={styles.subtitle}>
            Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo
            D. Quijote de la Mancha
          </Text> */}
          <Text style={styles.text}>
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
            mucho tiempo que vivía un hidalgo de los de lanza en astillero,
            adarga antigua, rocín flaco y galgo corredor. Una olla de algo más
            vaca que carnero, salpicón las más noches, duelos y quebrantos los
            sábados, lentejas los viernes, algún palomino de añadidura los
            domingos, consumían las tres partes de su hacienda. El resto della
            concluían sayo de velarte, calzas de velludo para las fiestas con
            sus pantuflos de lo mismo, los días de entre semana se honraba con
            su vellori de lo más fino. Tenía en su casa una ama que pasaba de
            los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo
            de campo y plaza, que así ensillaba el rocín como tomaba la
            podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años,
            era de complexión recia, seco de carnes, enjuto de rostro; gran
            madrugador y amigo de la caza. Quieren decir que tenía el
            sobrenombre de Quijada o Quesada (que en esto hay alguna diferencia
            en los autores que deste caso escriben), aunque por conjeturas
            verosímiles se deja entender que se llama Quijana; pero esto importa
            poco a nuestro cuento; basta que en la narración dél no se salga un
            punto de la verdad
          </Text>
          <Text style={styles.text}>
            Es, pues, de saber, que este sobredicho hidalgo, los ratos que
            estaba ocioso (que eran los más del año) se daba a leer libros de
            caballerías con tanta afición y gusto, que olvidó casi de todo punto
            el ejercicio de la caza, y aun la administración de su hacienda; y
            llegó a tanto su curiosidad y desatino en esto, que vendió muchas
            hanegas de tierra de sembradura, para comprar libros de caballerías
            en que leer; y así llevó a su casa todos cuantos pudo haber dellos;
            y de todos ningunos le parecían tan bien como los que compuso el
            famoso Feliciano de Silva: porque la claridad de su prosa, y
            aquellas intrincadas razones suyas, le parecían de perlas; y más
            cuando llegaba a leer aquellos requiebros y cartas de desafío, donde
            en muchas partes hallaba escrito: la razón de la sinrazón que a mi
            razón se hace, de tal manera mi razón enflaquece, que con razón me
            quejo de la vuestra fermosura, y también cuando leía: los altos
            cielos que de vuestra divinidad divinamente con las estrellas se
            fortifican, y os hacen merecedora del merecimiento que merece la
            vuestra grandeza.
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  </Grid>
);

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

export default Quixote;
