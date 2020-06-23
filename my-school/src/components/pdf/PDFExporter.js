import React, { useState} from "react";
import { connect } from "react-redux";
import {
  Font,
  BlobProvider,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import fontN from "../../assets/Nunito_Sans/Nunito Sans Regular.ttf";
import fontP from "../../assets/Pridi/Pridi Light.ttf";
import fontR from "../../assets/Raleway/Raleway Medium.ttf";
import Loader from "react-spinners/ClimbingBoxLoader";
import { getAllActivitiesForUser } from "../../redux/actions/portfolio-actions";
import { Button, Box, Flex } from "@chakra-ui/core";

import PDFDocument from './PDFDocument'

Font.register({
  family: "Nunito",
  src: fontN,
});

Font.register({
  family: "Pridi",
  src: fontP,
});

Font.register({
  family: "Raleway",
  src: fontR,
});

// Create Document Component
const MyDocument = ({ activities }) => {
  const [downloadType, setDownloadType] = useState(
    window.innerWidth > 800 
  );

  const handleResize = () => {
    setDownloadType(window.innerWidth > 800)
  }

window.addEventListener('resize', handleResize)

  const PdfPortfolio = (
    <PDFDocument activities={activities}/>
  );

  return (
    <Box w="100%" >
      <Flex direction="row" align="center" justify="center">
        {downloadType === true ? (
          <BlobProvider document={PdfPortfolio}>
            {({ url, loading }) => (
              !loading ?
              <a href={url} target="_blank" rel="noopener noreferrer">
                Link to PDF
              </a>
              :
               <div
                  style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40vh",
                  }}
               >
                  <Loader color={"#375E97"} height="75vh" />
              </div>
            )}
          </BlobProvider>
        ) : (
          
      
          <PDFDownloadLink
            as={Button}
            document={PdfPortfolio}
            filename="portfolio.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading || error ?
              <div
              style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
              }}
           >
              <Loader color={"#375E97"} height="75vh" />
          </div>
              : 
              "Download to Computer"
            }
          </PDFDownloadLink>
        )}
      </Flex>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities,
    isLoading: state.portfolioReducer.isLoading,
    error: state.portfolioReducer.error,
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser })(
  MyDocument
);
