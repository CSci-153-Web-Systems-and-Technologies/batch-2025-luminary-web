'use client';
import { ReactReader } from "react-reader"
import { EpubView } from "react-reader";
import { useState } from "react"
export default function EpubReader(){
    const [location, setLocation] = useState<number | string>(1)
    return(
        <>
            <header>
            </header>
            <main>  
                <ReactReader 
                url="./books/HarryPotterandtheChamberofSecrets.epub"
                location={location}
                locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                ></ReactReader>
            </main>
            <footer>

            </footer>
        </>
    )
}