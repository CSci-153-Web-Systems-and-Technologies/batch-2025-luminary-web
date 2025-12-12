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
  book_url : string | null,
  pageNumber : number,
  numPages : number,
  setNumPages: (numPages : number) => void,
}
const PDFViewer = ({book_url, pageNumber, numPages, setNumPages} : PDFViewerProps) => {
  return <PDFViewerClient book_url={book_url} pageNumber={pageNumber} numPages={numPages}
        setNumPages={setNumPages}  
  />;
};
export default PDFViewer;