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
    const [favorite, setFavorite] = useState(false);
    
    const [user, setUser] = useState<any>(null)
    useEffect(()=>{
        const getBookID = async()=>{
            const searchParams = await params;
            const {bookId} = searchParams;
            setBookID(bookId);
            console.log("The Book ID is: " + bookId);
        }
        getBookID();

        const getUser=async()=>{
            
            const {data : {user}} = await supabase.auth.getUser();

            setUser(user);
        }

        getUser();
    }, [])


    const fetchFavorite = async()=>{
        const {data, error} = await supabase.from('favorites').select('*').eq('book_id', bookID).eq('user_id', user.user_metadata.sub);

        setFavorite((data && data.length > 0 ? true : false));
    }
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

            if(user){
                fetchFavorite();
            }
        }
    }, [bookID])


    function favoriteAction(){
        if(favorite){
            deleteFromFavorites();
        }
        else{
            addToFavorites();
        }
    }

    async function addToFavorites(){
        const {error} = await supabase.from('favorites').insert([
            {
                'book_id' : bookID,
                'user_id' : user.user_metadata.sub,
            }
        ])    
        if(error){
            alert("Error adding to favorites!")
        }
        else{
            alert("Added to favorites!");
        }
    }

    async function deleteFromFavorites(){
        const {error} = await supabase.from('favorites').delete().eq("book_id", bookID).eq("user_id", user.user_metadata.sub);
        if(error){
            alert("Error deleting from favorites!");
        }
        else{
            alert("Deleted from favorites!");
            fetchFavorite();
        }
    }
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