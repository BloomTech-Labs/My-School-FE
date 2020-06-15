import { StyleSheet } from "@react-pdf/renderer";
/* ---------------------- Document Styles----------------------------------------- */
const style = StyleSheet.create({
  body: {
    // paddingTop: 45,
    // paddingBottom: 65,
    // paddingHorizontal: 35,
    backgroundColor: "white",
  },
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Raleway',
    textDecoration: 'underline'
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Raleway'
  },
  text: {
    fontSize: 14,
    marginLeft: "4cm",
    textAlign: 'justify',
    fontFamily: 'Pridi',
  },
  image: {
    marginTop: 40,
    marginLeft: "4cm",
    height: "auto",
    width: "6in"
  },
});
/* ----------------------/STYLES----------------------------------------- */

export default style;