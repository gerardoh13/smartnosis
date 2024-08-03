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
    let age = currentDate.getFullYear() - birthDate.getFullYear();
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
      flexDirection: "row",
      flexWrap: "wrap",
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
      justifyContent: "space-between",
      marginTop: 10,
    },
    imageContainer: {
      width: "50%",
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
      border: "2px solid #b3e5fc",
      borderRadius: 10,
      padding: 10,
    },
    columnLeft: {
      flexDirection: "column",
      width: "50%",
      paddingRight: 10,
    },
    columnRight: {
      flexDirection: "column",
      width: "50%",
      paddingLeft: 10,
    },
    flexContainer: {
      flexDirection: "row",
      width: "100%",
    },
    flexColumn: {
      flexDirection: "column",
      width: "50%",
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
            <Text>{intake.email}</Text>
            <Text>{intake.address1}</Text>
            {intake.address2 ? <Text> {intake.address2}</Text> : null}
            <Text>
              {intake.city}, {intake.state} {intake.zip}
            </Text>
          </View>
        </View>

        <View style={styles.flexContainer}>
          <View style={styles.flexColumn}>
            <Text style={styles.sect}>
              <Text style={styles.inlineBold}>Patient Name: </Text>
              <Text style={styles.inlineUnderline}>
                {`${intake.firstName} ${
                  intake.middleName ? intake.middleName + " " : ""
                }${intake.lastName}`}
              </Text>
            </Text>
            <Text style={styles.text}>
              <Text style={styles.inlineBold}>D.O.B: </Text>
              <Text style={styles.inlineUnderline}>
                {intake.dob}, {calculateAge(intake.dob)}{" "}
                {calculateAge(intake.dob) > 1 && calculateAge(intake.dob) !== 0
                  ? "years"
                  : "year"}{" "}
                old
              </Text>
            </Text>
            <Text style={styles.text}>
              <Text style={styles.inlineBold}>Sex: </Text>
              <Text style={styles.inlineUnderline}> {intake.sex}</Text>
            </Text>

            <Text style={{ ...styles.sect, ...styles.inlineBold }}>
              Reason for Visit:
            </Text>
            {intake.symptoms.length ? (
              intake.symptoms.map((s) => (
                <Text style={styles.bulletPoint} key={s}>
                  • {s}
                </Text>
              ))
            ) : (
              <Text style={styles.bulletPoint}>• N/A</Text>
            )}
            <Text style={{ ...styles.sect, ...styles.inlineBold }}>
              Have you Been Diagnosed (past/present):
            </Text>
            {intake.conditions.length ? (
              intake.conditions.map((s) => (
                <Text style={styles.bulletPoint} key={s}>
                  • {s}
                </Text>
              ))
            ) : (
              <Text style={styles.bulletPoint}>• N/A</Text>
            )}

            <Text style={styles.sect}>
              <Text style={styles.inlineBold}>Tobacco Use: </Text>
              <Text style={styles.inlineUnderline}>{intake.tobaccoUse}</Text>
            </Text>

            <Text style={styles.sect}>
              <Text style={styles.inlineBold}>Alcohol Use: </Text>
              <Text style={styles.inlineUnderline}>{intake.alcoholUse}</Text>
            </Text>

            <Text style={styles.sect}>
              <Text style={styles.inlineBold}>Drug Use: </Text>
              <Text style={styles.inlineUnderline}>{intake.drugUse}</Text>
            </Text>

            {intake.insurance === "Yes" ? (
              <>
                <Text style={{ ...styles.sect, ...styles.inlineBold }}>
                  Insurance Information:
                </Text>
                <Text style={{ ...styles.sect, ...styles.bulletPoint }}>
                  <Text style={styles.inlineBold}>- Provider: </Text>
                  <Text style={styles.inlineUnderline}>
                    {intake.insProvider}
                  </Text>
                </Text>

                <Text style={{ ...styles.sect, ...styles.bulletPoint }}>
                  <Text style={styles.inlineBold}>
                    - Relationship to Insured:{" "}
                  </Text>
                  <Text style={styles.inlineUnderline}>
                    {intake.insRelationship}
                  </Text>
                </Text>

                {intake.insuranceId ? (
                  <Text style={{ ...styles.sect, ...styles.bulletPoint }}>
                    <Text style={styles.inlineBold}>- Insurance Id:</Text>
                    <Text style={styles.inlineUnderline}>
                      {intake.insuranceId}
                    </Text>
                  </Text>
                ) : null}
                {intake.insGroupNumber ? (
                  <Text style={{ ...styles.sect, ...styles.bulletPoint }}>
                    <Text style={styles.inlineBold}>- Group Number: </Text>
                    <Text style={styles.inlineUnderline}>
                      {intake.insGroupNumber}
                    </Text>
                  </Text>
                ) : null}
                {intake.insGroupName ? (
                  <Text style={{ ...styles.sect, ...styles.bulletPoint }}>
                    <Text style={styles.inlineBold}>- Group Name: </Text>
                    <Text style={styles.inlineUnderline}>
                      {intake.insGroupName}
                    </Text>
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
          </View>

          <View style={styles.flexColumn}>
            <Text style={{ ...styles.sect, ...styles.inlineBold }}>
              Family Medical History:
            </Text>
            <Text style={{ ...styles.sect, ...styles.inlineBold }}>
              - Mother:
            </Text>
            {intake.motherHistory.length ? (
              intake.motherHistory.map((s) => (
                <Text style={styles.bulletPoint} key={s}>
                  • {s}
                </Text>
              ))
            ) : (
              <Text style={styles.bulletPoint}>• N/A</Text>
            )}

            <Text style={{ ...styles.sect, ...styles.inlineBold }}>
              - Father:
            </Text>
            {intake.fatherHistory.length ? (
              intake.fatherHistory.map((s) => (
                <Text style={styles.bulletPoint} key={s}>
                  • {s}
                </Text>
              ))
            ) : (
              <Text style={styles.bulletPoint}>• N/A</Text>
            )}

            <Text style={{ ...styles.sect, ...styles.inlineBold }}>
              - Grandparents:
            </Text>
            {intake.grandparentsHistory.length ? (
              intake.grandparentsHistory.map((s) => (
                <Text style={styles.bulletPoint} key={s}>
                  • {s}
                </Text>
              ))
            ) : (
              <Text style={styles.bulletPoint}>• N/A</Text>
            )}

            <Text style={{ ...styles.sect, ...styles.inlineBold }}>
              - Siblings:
            </Text>
            {intake.siblingHistory.length ? (
              intake.siblingHistory.map((s) => (
                <Text style={styles.bulletPoint} key={s}>
                  • {s}
                </Text>
              ))
            ) : (
              <Text style={styles.bulletPoint}>• N/A</Text>
            )}
          </View>
        </View>

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
