import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import axios from "axios";

// import ActivityCard from "./ActivityCard";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
});

// Create Document Component
const MyDocument = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("https://my-school-v1.herokuapp.com/api/activities")
      .then((res) => {
        console.log('****************************', res.data)
        setActivities(res.data);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if(activities.length >= 0){
    const student = ([activities.studentsName] + "\'s Portfolio");
    return (
        <Document onRender={() => alert("rendered")} title={student}>
     
           
                <Page size="A4" style={styles.page}>
                {activities.map(a => {
                return(
                        <View style={styles.section}  key={a.id}>
                            <Text >{a.name}</Text>
                            <Text >{a.description}</Text>
                            <Image  src={a.photo} />
                        </View>
                    
                )
                  
            })}
             </Page> 
        </Document>
    )
  } else {
    return (
      <Document>
        <Page>
          <Text>Hi</Text>
        </Page>
      </Document>
    )
  }
;
};

export default MyDocument;
