"use client";

import styles from './styles/user-profile-page.module.css';
import { useSearchParams } from "next/navigation"
import BookCard from '../main-page/components/book-card';
import { BookSelectionType } from '../main-page/components/book-selections';
import { createClient } from '../../../utils/supabase/client';
import { useState, useEffect } from 'react';
import BookSelection from './components/book-selection';
import { useRouter } from 'next/navigation';
import EditUsername from '../general-components/edit-username';
import EditCollection from '../general-components/edit-collection';
import PublishBook from '../general-components/publish-book';
import AuthorSelection from './components/author-selection';
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

export enum ProfileModalMode{
    EditUsername,
    EditCollection,
    PublishBook,
    Off
}


interface GenerateModalProps{
    modalMode : ProfileModalMode,
    setModalMode : (modalMode : ProfileModalMode)=>void,
    userID : string | null,
    fetchUser : ()=>Promise<void>
    collections : any,
    fetchCollection : ()=>Promise<void>,
    user : any,
    
}
function GenerateModal({modalMode, setModalMode, userID, fetchUser, collections, fetchCollection, user} : GenerateModalProps)
{


    if(userID){
        if(modalMode === ProfileModalMode.EditUsername){
            return(
                <>
                    <EditUsername userID={userID} setModalMode={setModalMode} fetchUser={fetchUser}></EditUsername>
                </>
            )
        }
        else if(modalMode === ProfileModalMode.EditCollection){
            return(
                <>
                    <EditCollection setMode={setModalMode} collectionData={collections} fetchCollection={fetchCollection}></EditCollection>
                </>
            )
        }
        else if(modalMode === ProfileModalMode.PublishBook){
            return(
                <>
                    <PublishBook userID={userID} full_name={user?.full_name} setModalMode={setModalMode}></PublishBook>
                </>
            )
        }
    }
    return null;
}

export default function UserProfilePage() {
    const supabase = createClient();
    const searchParams = useSearchParams();
    const userID = searchParams.get("userID");
    const [user, setUser] = useState<any>(null);
    const [collections, setCollections] = useState<any>(null);
    const [collectionEBooks, setCollectionEBooks] = useState<any>(null);
    const [hashMap, setMap] = useState(new Map());
    const [modalMode, setModalMode] = useState(ProfileModalMode.Off);
    const [authorBooks, setAuthorBooks] = useState<any>(null);
    const {back} = useRouter();
    
    const fetchUser = async()=>{
            console.log("fetch user called!");
            const {data, error} = await supabase.from('profiles').select('*').eq('id', userID).limit(1).single();
            if(error){
                alert("Error fetching data!");
            }
            else{
                
            }
            setUser(!error ? data : null);
        }

    useEffect(()=>{
        fetchUser();
    }, [userID])

    const fetchCollections = async()=>{
                if(user){
                    const {data, error} = await supabase.from('collections').select("*").eq("user_id", user.id);
                    if(error){
                        alert("Failed to fetch collections!");
                    }
                    setCollections(!error ? data : null);
                }
    }
    async function fetchAuthorBooks(){
        const {data, error} = await supabase.from('books').select("*").eq('writerid', user.id);
        console.log(data);
        setAuthorBooks(data);
    }
    
    useEffect(
        ()=>{


            fetchCollections();
            if(user?.isWriter){
               fetchAuthorBooks();
            }
        }
        ,
        [user]
    )
    
    
    useEffect(
        ()=>{
            const fetchCollectionEBooks = async()=>{
                
                const tempEBooksCollection : any[] = [];
                if(user && collections){
                    for(let i = 0; i < collections.length; i++){
                       
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
                                    
                                    setMap(tempMap);
                                }
                            }
                        }
                        if(data){
                            for(let j = 0; j < data.length; j++){
                                tempEBooksCollection.push(data[j]);
                            }
                        }
                        
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
        <>
        <GenerateModal 
        modalMode={modalMode} 
        setModalMode={setModalMode}
        userID={userID}
        fetchUser={fetchUser}
        collections={collections}
        fetchCollection={fetchCollections}
        user={user}
        >

        </GenerateModal>
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
                        <button className={styles.actionButton} onClick={()=>{setModalMode(ProfileModalMode.EditUsername)}}>Edit Username</button>
                        <button className={styles.actionButton} onClick={()=>{setModalMode(ProfileModalMode.PublishBook)}}>{!user?.isWriter ? "Become A Writer!" : "Publish story"}</button>
                    </div>     

                    <div className={styles.collections}>


                        {
                            user?.isWriter ? 
                            <>
                        
                            <AuthorSelection books={authorBooks}></AuthorSelection>

                            </>
                            : 
                            null
                        }
                        
                        <header>
                            Collections
                            <button onClick={()=>{setModalMode(ProfileModalMode.EditCollection)}}>
                                <img src="/pencil.svg" alt="" />
                            </button>
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
        </>
    );
}

