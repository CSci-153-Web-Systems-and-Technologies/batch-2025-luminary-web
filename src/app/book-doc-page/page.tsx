'use client';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PDFViewer from "./components/PDFViewer";
// import './styles/header.css'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();



export default function Reader(){
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);


    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
    return(
            <>
                <header>
                    <div className="left-hand-side">
                        <button>
                            <img src="arrow-left.svg" alt="arrow-left" />
                        </button>
                        <div id="book-info">
                            <h1>
                                We Hunt The Flame
                                {/*To be replaced with {bookTitle} */}
                            </h1>
                            <p>
                                Hafsah Faizal
                                {/* 
                                *to be replaced with {author}
                                */}
                            </p>
                        </div>
                    </div>

                    <div className="right-hand-side">
                        <button className="img-container">
                            <img src="add-collection.svg" alt="" />
                        </button>
                        <button className="img-container">
                            <img src="contents.svg" alt="" />
                        </button>
                        <button className="img-container">
                            <img src="add-note.svg" alt="" />
                        </button>
                        <button className="img-container">
                            <img src="kebab-menu.svg" alt="" />
                        </button>

                        <button className="mobile-img-container">
                            <img src="hamburgerButton.svg" alt="" />
                        </button>
                    </div>
                </header>
                <main>
                        <PDFViewer 
                        pageNumber={pageNumber} 
                        numPages={numPages}
                        setNumPages={setNumPages}
                        setPageNumber={setPageNumber}  
                        />
                </main>
                <footer>
                    <nav>
                        <button>
                            <img src="bookmark.svg" alt="bookmark" />
                        </button>
                        <button
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        >
                        <img src="prev-page.svg" alt="prev-page" />
                        </button>

                        <div id="page-info">

                            <input type="range"
                            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{setPageNumber(Number(e.currentTarget.value))}}
                            min={1}
                            max={numPages}
                            step={1}
                            value={pageNumber}
                            className="custom-slider"
                            />
                            
                            <p style={{ margin: 0, fontWeight: "bold", color: "#9397AA" }}>
                            Page {pageNumber + " "} of {numPages || "..."}
                            </p>
                        </div>
                        
                        <button
                        onClick={goToNextPage}
                        >
                        <img src="next-page.svg" alt="next-page" />
                        </button>

                         <div className="space-filler">

                    </div>
                    
                        
                    </nav>
                   
                </footer>
            </>
        )
}

