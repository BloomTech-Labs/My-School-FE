import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  BlobProvider
} from "@react-pdf/renderer";;

// ----------------------STYLES-----------------------------------------
const style = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "white",
  },
  page: {
    flexFlow: "row wrap",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    alignSelf: "right",
    width: 200,
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Times-Roman'
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Times-Roman'
  },
  text: {
    margin: 16,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    width: '150px'
  },
});
// ----------------------/STYLES-----------------------------------------
// Create Document Component
const MyDocument = ({ activities }) => {

  const PdfPortfolio = (
    <Document style={style.doc} title={""}>
      <Page size="A4" style={style.page}>
        <View >
          {activities.map((a) => {
            return (
              <View key={a.id} className='section'>
                <Text style={style.header}>{a.name}</Text>
                <Text style={style.subtitle}>Date: {a.completion_date}  Subject: {a.subject} Duration:{a.duration}"</Text>
              <Text style={style.text}>{a.description}</Text>
                {a.photo && <Image src={a.photo} style={style.image} />}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  )

  return (
    <BlobProvider document={PdfPortfolio}>
      {({ url }) => <a href={url} target="_blank">Link to PDF</a>}
    </BlobProvider>
  );
};

export default MyDocument;
