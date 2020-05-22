import { StyleSheet } from "@react-pdf/renderer";
/* ---------------------- Document Styles----------------------------------------- */
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
    marginLeft: 100,
    alignSelf: "right",
    width: 100,
  },
});
/* ----------------------/STYLES----------------------------------------- */

export default style;