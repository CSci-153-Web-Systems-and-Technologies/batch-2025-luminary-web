"use client";
import BookContainer from "../components/BookContainer"
import styles from '../styles/book-info-page.module.css'
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../../../utils/supabase/client";
import Image from "next/image";
export default function BookInfoPage({params} : {params : Promise<{bookId : string}>}){
    const supabase = createClient();
    const {back} = useRouter();
    const [bookID, setBookID] = useState<string | null>(null);
    const [bookData, setBookData] = useState<any>(null);

    useEffect(()=>{
        const getBookID = async()=>{
            const searchParams = await params;
            const {bookId} = searchParams;
            setBookID(bookId);
            
            console.log("The Book ID is: " + bookId);
        }
        getBookID();
    }, [])
    useEffect(()=>{
        if(bookID){
            const fetchBookData = async()=>{
                const {data, error} = await supabase.from('books').select("*").eq("id", bookID).single();
                if(error){
                    console.error("Error fetching books!");
                }
                else{
                    console.log(data);
                }
                setBookData(!error ? data : null);
            }
        
            fetchBookData();
        }
    }, [bookID])
    return(
        <>
            <div className={styles["bookinfopage"]}> 
                <header className={styles["bookinfo-header"]}>
                    <button className={styles["close-button"]}
                            onClick={()=>{back();}}>
                        <img src="/cross.svg" alt="close-button"/>
                    </button>
                    
                    <h1>
                        LUMINARY
                    </h1>

                    <div className={styles["empty-placeholder"]}>

                    </div>
                </header>

                <BookContainer imgUrl={bookData?.image_url} 
                bookTitle={bookData?.book_title} 
                author={bookData?.author} 
                genre={bookData?.genre}
                bookSummary={bookData?.description}
                pdfUrl={bookData?.pdf_url}
                bookID={bookID}
                ></BookContainer>
               

            </div>
        </>
    )
}