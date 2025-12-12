"use client";
import BookContainer from "./components/BookContainer"
import styles from './styles/book-info-page.module.css'
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import Image from "next/image";

export default function BookInfoPage(){
    const supabase = createClient();
    const {back} = useRouter();
    const [bookData, setBookData] = useState<any>(null);
    const [favorite, setFavorite] = useState(false);
    
    const [user, setUser] = useState<any>(null);
    const searchParams = useSearchParams();
    const bookID : string | null = searchParams.get('bookId');
    const isPending = searchParams.get('ispending');
    console.log(isPending);
    useEffect(()=>{
        
        const getUser=async()=>{
            
            const {data : {user}} = await supabase.auth.getUser();

            setUser(user);
        }

        getUser();
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
            
            
            const fetchPendingBookData = async()=>{
                const {data, error} = await supabase.from('pending-books').select("*").eq("id", bookID).single();
                if(error){
                    console.error("Error fetching books!");
                }
                else{
                    console.log(data);
                }
                setBookData(!error ? data : null);              
            }

            if(isPending){
                fetchPendingBookData();
            }
            else{
                fetchBookData();
            }
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
                isPending={isPending}
                ></BookContainer>
               
                <div className={styles["review-section"]}>

                </div>
            </div>
        </>
    )
}