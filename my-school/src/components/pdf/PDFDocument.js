import React from 'react'
import {
    Page,
    Text,
    View,
    Document,
    Image,
  } from "@react-pdf/renderer";
import moment from "moment";
import style from "./PDFStyles.js";
import timeChange from "../../utils/timeChange";
 

const PDFDocument = ({activities}) => {

    function noNull(item) {
        if (item === "null") {
          item = "";
        } else {
          return item;
        }
      }
      
    return (
        <Document style={style.doc} title={""}>
        <Page size="A4" style={style.page}>
          <View>
            {activities.map((a) => {
              let subdate = moment(a.completion_date).format("MMMM Do YYYY");
              let durtime = timeChange(a.duration);
  
              return (
                <View key={a.id} className="section" wrap={false}>
                  <Text style={style.title}>{a.name}</Text>
                  <Text style={style.subtitle}>
                    Date: {subdate} Subject: {a.subject} Duration: {durtime}
                  </Text>
                  <Text style={style.text}>{noNull(a.description)}</Text>
                  {a.photo && (
                    <Image
                      src={`https${a.photo.slice(4, a.photo.length)}`}
                      style={style.image}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </Page>
      </Document>
    )
}

export default PDFDocument