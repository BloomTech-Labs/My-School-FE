import React from "react";
import {
  Page,
  Font,
  Text,
  View,
  Document,
  Image,
  BlobProvider
} from "@react-pdf/renderer";
import moment from 'moment';
import fontN from "../assets/Nunito_Sans/Nunito Sans Regular.ttf"
import fontP from "../assets/Pridi/Pridi Light.ttf"
import fontR from "../assets/Raleway/Raleway Medium.ttf"
import "../App.css";
import style from "./PDFExporterStyles.js";
import { Button, Box, Flex } from '@chakra-ui/core';

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


// Create Document Component
const MyDocument = ({ activities }) => {

  function timechange(num){ 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + "h " + minutes + "m";         
  };

  function noNull(item){
    if(item==="null"){
      let item = "";
    } else {
      return(item)
    }
  }
 
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
              <Text style={style.text}>{noNull(a.description)}</Text>
                {a.photo && <Image src={a.photo} style={style.image} />}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>

  );

  return (
    <Box w="100%">
      <Flex direction="row"
          align="center"
          justify="center">
        <Button>  
          <BlobProvider document={PdfPortfolio}>
            {({ url }) => <a href={url} target="_blank" rel="noopener noreferrer">Link to PDF</a>}
            </BlobProvider>
        </Button>
      </Flex>
    </Box>
  );
};

export default MyDocument;
