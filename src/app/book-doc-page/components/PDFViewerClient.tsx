"use client";
import { useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import dynamic from "next/dynamic";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";




pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();


interface PDFViewerClientProps{ 
  book_url : string | null,
  pageNumber : number,
  numPages : number,
  setNumPages: (numPages : number) => void,
  
}

const PDFViewerClient = ( {book_url, pageNumber, numPages, setNumPages} : PDFViewerClientProps) => {

  const file = useMemo(() => ({book_url}), [book_url])

  const onDocumentLoadSuccess = ({ numPages } : {numPages : number}) => {
    setNumPages(numPages);
  };

  


  return (
    <div className="div-container" style={{ height : "100%", width : "100%"}}>
      
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Document
          file={book_url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          loading={
            <div style={{ padding: "2rem", textAlign: "center" }}>
              Loading PDF...
            </div>
          }
          error={
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "red",
              }}
            >
              Failed to load PDF. Please make sure the file exists in the public
              folder.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            // height={639}
            width={800}
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewerClient;