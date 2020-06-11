import React from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import PDFPortfolio from './PDFPortfolio';
// import { Link } from 'react-router-dom';


const Blob = () => {
    
    var link = document.createElement('a');
    link.href=
    <BlobProvider document={PDFPortfolio}>
        {({ blob, url }) => {return url;}}
    </BlobProvider>

 
    
}
export default Blob;