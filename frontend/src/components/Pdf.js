import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

function PDF({ intake }) {
  const calculateAge = (date) => {
    const birthDate = new Date(date);
    const currentDate = new Date();
    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    // Adjust the age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

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
    sect: {
      marginBottom: 1,
      marginTop: 10,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    text: {
      margin: 2,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    bulletPoint: {
      margin: 2,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
      marginLeft: 10,
    },
    image: {
      marginHorizontal: 200,
      width: "25%",
    },
    imgRow: {
      flexDirection: "row",
      justifyContent: "space-between", // Align images with space between them
      marginTop: 10,
    },
    imageContainer: {
      width: "50%", // Set the width to half of the page
    },
    insCardImg: {
      width: "100%",
    },
    imgDescription: {
      textAlign: "center",
      marginTop: 5,
      fontSize: 12,
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
    inlineUnderline: {
      textDecoration: "underline",
    },
    inlineBold: {
      fontFamily: "Times-Bold",
    },
    textRow: {
      flexDirection: "row",
      fontSize: 12,
      marginLeft: 280,
      fontFamily: "Times-Roman",
      marginBottom: 10,
      marginTop: 10,
      border: "2px solid #b3e5fc", // Border color and width
      borderRadius: 10, // Border radius for rounded corners
      padding: 10, // Padding inside the container
    },
    columnLeft: {
      flexDirection: "column",
      textAlign: "right",
      width: "50%",
      marginRight: 5,
    },
    columnRight: {
      flexDirection: "column",
      width: "50%",
      textDecoration: "underline",
    },
  });

  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.image} src="/BW-Smartnosis-Logo.png" />

        <View style={styles.textRow}>
          <View style={styles.columnLeft}>
            <Text>Date:</Text>
            <Text>Insurance:</Text>
            <Text>Primary Phone:</Text>
            <Text>Patient Email:</Text>
            <Text>Patient Address:</Text>
          </View>
          <View style={styles.columnRight}>
            <Text>
              {new Date(intake.submittedAt * 1000).toLocaleDateString()}
            </Text>
            <Text>{intake.insurance}</Text>
            <Text>{intake.phone}</Text>
            <Text>{intake.insurance}</Text>
            <Text>{intake.address1}</Text>
            {intake.address2 ? <Text> {intake.address2}</Text> : null}
            <Text>
              {" "}
              {intake.city}, {intake.state} {intake.zip}
            </Text>
          </View>
        </View>

        <Text style={styles.sect}>
          <Text style={styles.inlineUnderline}>Patient Name:</Text>
          <Text style={styles.inlineBold}>
            {` ${intake.firstName} ${
              intake.middleName ? intake.middleName + " " : ""
            }${intake.lastName}`}
          </Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.inlineUnderline}>D.O.B:</Text>
          <Text style={styles.inlineBold}>
            {" "}
            {intake.dob}, {calculateAge(intake.dob)}{" "}
            {calculateAge(intake.dob) > 1 && calculateAge(intake.dob) !== 0
              ? "years"
              : "year"}{" "}
            old
          </Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.inlineUnderline}>Sex:</Text>
          <Text style={styles.inlineBold}> {intake.sex}</Text>
        </Text>

        <Text style={{ ...styles.sect, ...styles.inlineUnderline }}>
          Reason for Visit:
        </Text>
        {intake.symptoms.length
          ? intake.symptoms.map((s) => (
              <Text style={styles.bulletPoint} key={s}>
                • {s}
              </Text>
            ))
          : null}
        <Text style={{ ...styles.sect, ...styles.inlineUnderline }}>
          Patient Health History:
        </Text>
        {intake.conditions.length
          ? intake.conditions.map((s) => (
              <Text style={styles.bulletPoint} key={s}>
                • {s}
              </Text>
            ))
          : null}

        {intake.insurance === "Yes" ? (
          <>
            <Text style={{ ...styles.sect, ...styles.inlineUnderline }}>
              Insurance Provider:
            </Text>
            <Text style={styles.bulletPoint}>
              • Provider: {intake.insProvider}
            </Text>
            <Text style={styles.bulletPoint}>
              • Relationship to Insured: {intake.insRelationship}
            </Text>
            {intake.insuranceId ? (
              <Text style={styles.bulletPoint}>
                • Insurance Id: {intake.insuranceId}
              </Text>
            ) : null}
            {intake.insGroupNumber ? (
              <Text style={styles.bulletPoint}>
                • Group Number: {intake.insGroupNumber}
              </Text>
            ) : null}
            {intake.insGroupName ? (
              <Text style={styles.bulletPoint}>
                • Group Name: {intake.insGroupName}
              </Text>
            ) : null}
            {intake.insBackPId || intake.insFrontPId ? (
              <View style={styles.imgRow}>
                {intake.insFrontPId ? (
                  <View style={styles.imageContainer}>
                    <Text style={styles.imgDescription}>
                      Front of Insurance Card
                    </Text>
                    <Image
                      style={styles.insCardImg}
                      src={`https://res.cloudinary.com/dolnu62zm/image/upload/v1694500921/${intake.insFrontPId}.jpg`}
                    />
                  </View>
                ) : null}
                {intake.insBackPId ? (
                  <View style={styles.imageContainer}>
                    <Text style={styles.imgDescription}>
                      Back of Insurance Card
                    </Text>
                    <Image
                      style={styles.insCardImg}
                      src={`https://res.cloudinary.com/dolnu62zm/image/upload/v1694500921/${intake.insBackPId}.jpg`}
                    />
                  </View>
                ) : null}
              </View>
            ) : null}
          </>
        ) : null}

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
  );
}
export default PDF;
