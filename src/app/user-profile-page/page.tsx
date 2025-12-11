"use client";

import styles from './styles/user-profile-page.module.css';
import { useSearchParams } from "next/navigation"
import BookCard from '../main-page/components/book-card';
import { BookSelectionType } from '../main-page/components/book-selections';
import { createClient } from '../../../utils/supabase/client';
import { useState, useEffect } from 'react';
import BookSelection from './components/book-selection';
import { useRouter } from 'next/navigation';
function GenerateList({bookGenre, bookData} : BookSelectionType ){
    return(
        <>
            {
                bookData?.map((book)=> {
                    if(bookGenre === book.genre){
                        return(
                            <li key={book.id}>
                                <BookCard imgUrl={book.image_url} bookID={book.id}></BookCard>
                            </li>
                        )
                    }
                })
            }
        </>
    )
}


export default function UserProfilePage() {
    const supabase = createClient();
    const searchParams = useSearchParams();
    const userID = searchParams.get("userID");
    const [user, setUser] = useState<any>(null);
    const [collections, setCollections] = useState<any>(null);
    const [collectionEBooks, setCollectionEBooks] = useState<any>(null);
    const [hashMap, setMap] = useState(new Map());
    const {back} = useRouter();
    useEffect(()=>{
        const fetchUser = async()=>{
            const {data, error} = await supabase.from('profiles').select('*').eq('id', userID).limit(1).single();
            if(error){
                alert("Error fetching data!");
            }
            else{
                
            }
            console.log("Data: ");
            console.log(data);
            setUser(!error ? data : null);
        }
        fetchUser();
    }, [userID])
    useEffect(
        ()=>{
            const fetchCollections = async()=>{
                if(user){
                    const {data, error} = await supabase.from('collections').select("*").eq("user_id", user.id);
                    if(error){
                        alert("Failed to fetch collections!");
                    }
                    setCollections(!error ? data : null);
                    console.log(data);
                }
                
            }
            fetchCollections();
        }
        ,
        [user]
    )

    useEffect(
        ()=>{
            const fetchCollectionEBooks = async()=>{
                console.log("Collections: ");
                console.log(collections);
                const tempEBooksCollection : any[] = [];
                if(user && collections){
                    console.log("Collection length " + collections.length);
                    for(let i = 0; i < collections.length; i++){
                        console.log("Iteration: " + (i + 1));
                        const {data, error} = await supabase.from("collectionebook").select("*").eq("collectionid", collections[i].id);
                        if(error){
                            alert("Failed to fetch Collection E Books!");
                        }
                        else if(data){
                            const outerData = data;
                            for(let j = 0; j < outerData.length; j++){
                                const alreadyStored = hashMap.has(data[j].bookid);
                                const tempMap = hashMap;
                                if(!alreadyStored){
                                    const {data, error} = await supabase.from('books').select("*").eq("id", outerData[j].bookid).limit(1).single();
                                    if(error){
                                        alert("Error fetching book data!");
                                    }
                                    tempMap.set(outerData[j].bookid, data);
                                    console.log("Book data: ");
                                    console.log(data);
                                    console.log(tempMap.get(outerData[j].bookid));
                                    setMap(tempMap);
                                }
                            }
                        }
                        console.log("Collection: ");
                        if(data){
                            for(let j = 0; j < data.length; j++){
                                tempEBooksCollection.push(data[j]);
                            }
                        }
                        console.log(tempEBooksCollection)
                        console.log("collection Ebook: ");
                        console.log(tempEBooksCollection);
                    }
                    // alert("Done fetching everything!");
                    setCollectionEBooks(tempEBooksCollection);
                }
            }
            fetchCollectionEBooks();
        }
        ,
        [collections]
    )

    useEffect(()=>{
        console.log("Collection E Book changed! Showing new result: ");
        console.log(collectionEBooks);
    }, [collectionEBooks]);
    return (
        <div className={styles.container}>
            <div className={styles.padding}>
                <button onClick={()=>{back()}}>
                    <img src="/home.svg" alt="" />
                </button>
            </div>
            <div className={styles.profileCard}>
                    <div className={styles.profileSection}>
                        <div className={styles.profilePicture}>
                            <img src="./profileButton.svg" alt="profile picture" />
                        </div>
                        <div className={styles.credentials}>
                            <h1 className={styles.fullName}>{user?.full_name}</h1>
                            <p className={styles.email}>{user?.email}</p>
                        </div>
                    </div>
                    <div className={styles.actionsSection}>
                        <button className={styles.actionButton}>Edit Username</button>
                        <button className={styles.actionButton}>{!user?.isWriter ? "Become A Writer!" : "Publish story"}</button>
                    </div>     

                    <div className={styles.collections}>
                        <header>
                            Collections
                        </header>

                        {collections?.map((collection, index)=>{
                            const filter = collectionEBooks?.filter((book)=>{
                                return book?.collectionid === collection.id
                            })
                            return(

                                <div key={index} style={{paddingBottom : "40px",}}>
                                    <BookSelection collection={collection} collectionsEBook={filter} hashMap={hashMap}></BookSelection>
                                </div>
                            )
                        })}
                        
                    </div>
            </div>
        </div>  
    );
}

