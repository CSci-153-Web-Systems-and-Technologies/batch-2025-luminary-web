"use client";
import { useRouter } from "next/navigation"
import styles from './styles/favorites.module.css'
import resultStyles from '../search-page/styles/results.module.css'
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import BookCard from "../main-page/components/book-card";
export default function Favorites(){
    const {back} = useRouter();
    const supabase = createClient();
    const [favoritesData, setFavoritesData] = useState<any>(null);
    const [bookData, setBookData] = useState<any>(null);
    const searchParams = useSearchParams();

    const userID = searchParams.get("userid");

    useEffect(
        ()=>{

            const fetchFavorites = 
            async () => {
                const {data, error} = await supabase.from("favorites").select("*").eq("user_id", userID);
                if(error){
                    alert("Failed to fetch favorites!");
                }
                setFavoritesData(data);
            }

            fetchFavorites();
            
        }, []
    )


    useEffect(()=>{
        if(favoritesData){
            const fetchBooks = async()=>{

                const tempArray : any[] = []
                for(let i = 0; i < favoritesData.length; i++){
                    const {data, error} = await supabase.from('books').select("*").eq("id", favoritesData[i].book_id).limit(1).single();
                    if(error){
                        alert("Failed to fetch books!");
                    }
                    else{
                        tempArray.push(data);
                    }
                    console.log("Temp array: ");
                    console.log(tempArray);
                }
                setBookData(tempArray);
                
            }

            fetchBooks();
        }
    }, [favoritesData])
    
    return(
        <>
        <div className={styles['parent-div']}>
        <header className={styles["search-header"]}>
            <button onClick={()=>{back()}}>
                <img src="arrow-left.svg" alt="" />
            </button>
            <h1>
                LUMINARY
            </h1>
            <div className={styles["empty-container"]}>

            </div>
        </header>
        <main className={styles['search-main']}>
            <div>
                <span>
                Favorites
                </span>
            </div>
            <div className={resultStyles['results']}>

                {bookData && bookData.length > 0 ?

                <ul>
                    {
                    bookData.map((book, index)=>{
                        return(
                            <li key={index}>
                                <BookCard 
                                imgUrl={book.image_url}
                                bookID={book.id}
                                ></BookCard>
                            </li>
                        )
                    })}
                </ul>

                :

                <div className={styles.nofavorites}>
                    You have no favorites.
                </div>
                }
            </div>
        </main>
        </div>
        
        </>
    )
}