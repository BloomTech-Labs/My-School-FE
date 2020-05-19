import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
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
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    width: '150px'
  },
});

// Create Document Component
const MyDocument = ({ activities }) => {
  // const [activities, setActivities] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://my-school-v1.herokuapp.com/api/activities")
  //     .then((res) => {
  //       console.log('****************************', res.data)
  //       setActivities(res.data);

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  console.log({activities})

  const student = [activities.studentsName] + "'s Portfolio";
  return (
    <Document onRender={() => alert("rendered")} title={student}>
      <Page size="A4" style={styles.page}>
      <View style={styles.section} >
        {activities.map((a) => {
          return (
            <View key={a.id}>
              <Text>{a.name}</Text>
              <Text>{a.description}</Text>
              {a.photo && <Image src={a.photo} style={styles.image}/>}
              </View>
          );
        })}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
