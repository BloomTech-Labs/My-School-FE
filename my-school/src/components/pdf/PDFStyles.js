import { StyleSheet } from "@react-pdf/renderer";

const style = StyleSheet.create({
  body: {
    // paddingTop: 45,
    // paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "white",
  },
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    marginLeft: "2cm",
    marginRight: "4cm"
  },
  title: {
    fontSize: 16,
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Raleway',
    textDecoration: 'underline',
    width: "80%",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
    textAlign: 'center',
    fontFamily: 'Raleway'
  },
  text: {
    fontSize: 14,
    width: "80%",
    marginTop: 10,
    textAlign: 'left',
    fontFamily: 'Pridi',
  },
  image: {
    marginTop: 40,
    height: "auto",
    width: "6in"
  },
});

export default style;