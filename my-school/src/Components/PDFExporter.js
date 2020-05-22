import React from "react";
import {
  Page,
  Font,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  BlobProvider
} from "@react-pdf/renderer";
import moment from 'moment';
import fontN from "../assets/Nunito_Sans/Nunito Sans Regular.ttf"
import fontP from "../assets/Pridi/Pridi Light.ttf"
import fontR from "../assets/Raleway/Raleway Medium.ttf"
import "../App.css";

Font.register({
  family: "Nunito",
  src: fontN
})

Font.register({
  family: "Pridi",
  src: fontP
})

Font.register({
  family: "Raleway",
  src: fontR
})


// ----------------------STYLES-----------------------------------------
const style = StyleSheet.create({
  body: {
    paddingTop: 45,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "white",
    margin: 10,
  },
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 25,
    padding: 15,
    flexGrow: 1,
    alignSelf: "right",
    width: 200,
  },
  title: {
    fontSize: 16,
    paddingTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Raleway',
    textDecoration: 'underline'
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    margin: 5,
    fontFamily: 'Raleway'
  },
  text: {
    margin: 25,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Pridi'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    width: 100,
  },
});
// ----------------------/STYLES-----------------------------------------
// Create Document Component
const MyDocument = ({ activities }) => {

  function timechange(num){ 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + "h " + minutes + "m";         
  };

 
  const PdfPortfolio = (
  
    <Document style={style.doc} title={""}>
      <Page size="A4" style={style.page}>
        <View >
          {activities.map((a) => {
            let subdate = moment(a.completion_date).format('MMMM Do YYYY');
            let durtime = timechange(a.duration);
            return (
              <View key={a.id} className='section' wrap={false}>
                <Text style={style.title}>{a.name}</Text>
                <Text style={style.subtitle}>Date: {subdate}      Subject: {a.subject}     Duration: {durtime}</Text>
              <Text style={style.text}>{a.description}</Text>
                {a.photo && <Image src={a.photo} style={style.image} />}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>

  );

  return (

    <BlobProvider document={PdfPortfolio}>
      {({ url }) => <a href={url} target="_blank" rel="noopener noreferrer">Link to PDF</a>}
    </BlobProvider>
  );
};

export default MyDocument;
