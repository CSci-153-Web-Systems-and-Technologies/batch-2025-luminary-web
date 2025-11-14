"use client";
import dynamic from "next/dynamic";


// Dynamically import the PDF viewer client component.
const PDFViewerClient = dynamic(() => import("./PDFViewerClient"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        fontSize: "1.2rem",
        color: "#333",
      }}
    >
      Loading PDF Viewer...
    </div>
  ),
});

// Dynamically import the PDF viewer client component.

interface PDFViewerProps{ 
  pageNumber : number,
  numPages : number,
  setNumPages: (numPages : number) => void,
  setPageNumber : (pageNumber : number) => void, 
}
const PDFViewer = ({pageNumber, numPages, setNumPages, setPageNumber} : PDFViewerProps) => {
  return <PDFViewerClient pageNumber={pageNumber} numPages={numPages}
        setNumPages={setNumPages}
        setPageNumber={setPageNumber}  
  />;
};
export default PDFViewer;