'use client';
import globalStyles from './styles/globals.module.css'
import headerStyles from './styles/header.module.css'

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PDFViewer from "./components/PDFViewer";
import { useRouter } from 'next/navigation';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();


//IMPORT MODALS:

import CollectionModal from '../general-components/collection-modal';

export default function Reader(){
    const router = useRouter();

    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);


    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
    return(
            <>
               
                {/* <CollectionModal></CollectionModal> */}
                <header className={headerStyles['bookdoc-header']}>
                    <div className={headerStyles["left-hand-side"]}>
                        <button onClick={()=>{router.back();}}>
                            <img src="arrow-left.svg" alt="arrow-left" />
                        </button>
                        <div className={headerStyles["book-info"]}>
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

                    <div className={headerStyles["right-hand-side"]}>
                        <button className={headerStyles["img-container"]}>
                            <img className={globalStyles['bookdoc-img']} src="add-collection.svg" alt="" />
                        </button>
                        <button className={headerStyles["img-container"]}>
                            <img className={globalStyles['bookdoc-img']} src="contents.svg" alt="" />
                        </button>
                        <button className={headerStyles["img-container"]}>
                            <img src="add-note.svg" alt="" />
                        </button>
                        <button className={headerStyles["img-container"]}>
                            <img className={globalStyles['bookdoc-img']} src="kebab-menu.svg" alt="" />
                        </button>

                        <button className={headerStyles["mobile-img-container"]}>
                            <img className={globalStyles['bookdoc-img']} src="hamburgerButton.svg" alt="" />
                        </button>
                    </div>
                </header>
                <main className={globalStyles['bookdoc-main']}>
                        <PDFViewer 
                        pageNumber={pageNumber} 
                        numPages={numPages}
                        setNumPages={setNumPages}
                        setPageNumber={setPageNumber}  
                        />
                </main>
                <footer className={globalStyles['bookdoc-footer']}>
                    <nav className={globalStyles['bookdoc-nav']}>
                        <button>
                            <img className={globalStyles['bookdoc-img']}src="bookmark.svg" alt="bookmark" />
                        </button>
                        <button
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        >
                        <img className={globalStyles['bookdoc-img']} src="prev-page.svg" alt="prev-page" />
                        </button>

                        <div className={globalStyles["page-info"]}>

                            <input className={globalStyles['bookdoc-input']} type="range"
                            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{setPageNumber(Number(e.currentTarget.value))}}
                            min={1}
                            max={numPages}
                            step={1}
                            value={pageNumber}
                            />
                            
                            <p style={{ margin: 0, fontWeight: "bold", color: "#9397AA" }}>
                            Page {pageNumber + " "} of {numPages || "..."}
                            </p>
                        </div>
                        
                        <button
                        onClick={goToNextPage}
                        >
                        <img  className={globalStyles['bookdoc-img']}src="next-page.svg" alt="next-page" />
                        </button>

                         <div className={globalStyles["space-filler"]}>

                    </div>
                    
                        
                    </nav>
                   
                </footer>
            </>
        )
}

