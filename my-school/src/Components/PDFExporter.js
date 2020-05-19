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

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
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

  if(activities.length){
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{activities[0].name}</Text>
            <Text>{activities[0].description}</Text>
            <Image src={activities[0].photo}/>
          </View>
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
