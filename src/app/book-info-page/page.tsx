"use client";
import BookContainer from "./components/BookContainer"
import styles from './styles/book-info-page.module.css'
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import Image from "next/image";
import CollectionModal from "../general-components/collection-modal";
import AddCollection from "../general-components/addcollection-modal";


import { ModalMode } from "../book-doc-page/page";

interface ModalProps{
    mode : ModalMode,
    setMode : (mode : ModalMode)=>void,
    collectionData : any,
    collectionEBooksData : any,
    fetchCollectionDatas : ()=>void,
    bookID : string | null,
    userData : any,
}
function Modal({
    mode ,
    setMode, 
    collectionData, 
    collectionEBooksData,
    fetchCollectionDatas ,
    bookID,
    userData 
} : ModalProps)
{
        if(mode === ModalMode.Collection){
            return <CollectionModal 
                    setMode={setMode} 
                    modalMode={mode} 
                    collectionData={collectionData} 
                    collectionEBooksData={collectionEBooksData}
                    fetchDatas={fetchCollectionDatas}
                    bookID={bookID}>
                    </CollectionModal>
        }
        else if(mode == ModalMode.AddCollection){
            return <AddCollection 
        setMode={setMode} 
        modalMode={mode} 
        userID={userData.id} 
        bookID={bookID}
        fetchDatas={fetchCollectionDatas}>
        </AddCollection>

        }
        return null;
    }

export default function BookInfoPage(){

    
    const supabase = createClient();
    const {back} = useRouter();
    const [bookData, setBookData] = useState<any>(null);
    const [favorite, setFavorite] = useState(false);
    
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [mode, setMode] = useState(ModalMode.Off);
    const searchParams = useSearchParams();
    const bookID : string | null = searchParams.get('bookId');
    const isPending = searchParams.get('ispending');
    // console.log(isPending);

    const [collectionData, setCollectionData] = useState<any>(null);
    const [collectionEBooksData, setCollectionEBooksData] = useState<any>(null);


    async function fetchCollectionData(){
        if(user){
                const {data, error} = await supabase.from('collections').select("*").eq('user_id', user.user_metadata.sub);
                if(error){
                    alert("Error fetching collection!");
                }
                else{
                    // alert("Collection successful!");
                    // console.log(data);
                    // console.log("Collection Data: " + data);
                }
                setCollectionData(!error ? data : null);     
        }
    }
    async function fetchCollectionEBooksData(){
        if(user){
            const {data, error} = await supabase.from('collectionebook').select("*").eq('bookid', bookID).eq("user_id", user.user_metadata.sub);
                if(error){
                    alert("Error fetching collectionebooks!");
                }
                else{
                    // alert("Collectionebook successful!");
                    // console.log(data);
                    // console.log("Collection ebooks Data: " + data);
                }
                setCollectionEBooksData(!error ? data : null);
        }
    }

    async function fetchCollectionDatas(){
        if(user){
            fetchCollectionData();
            fetchCollectionEBooksData();
        }
    }

    








    useEffect(()=>{
        
        const getUser=async()=>{
            
            const {data : {user}} = await supabase.auth.getUser();

            
            setUser(user);
            const getUser=async()=>{
            const{data, error} = await supabase.from('profiles').select("*").eq('id', user?.user_metadata.sub);
            if(error){
                alert("could not fetch data!");
            }
            else{
                // alert("profile data fetched!");
            }
            setUserData(data);
            }
            getUser();
        }

        getUser();

    }, [supabase])


    
    useEffect(()=>{
        if(bookID){
            const fetchBookData = async()=>{
                const {data, error} = await supabase.from('books').select("*").eq("id", bookID).single();
                if(error){
                    console.error("Error fetching books!");
                }
                else{
                    // console.log(data);
                }
                setBookData(!error ? data : null);
            }
            
            
            const fetchPendingBookData = async()=>{
                const {data, error} = await supabase.from('pending-books').select("*").eq("id", bookID).single();
                if(error){
                    console.error("Error fetching books!");
                }
                else{
                    // console.log(data);
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
    }, [supabase, isPending, bookID])


    useEffect(()=>{
        fetchCollectionDatas();
        
    }, [user])

    return(
        <>
            <Modal
            
            mode={mode}
            setMode={setMode} 
            collectionData={collectionData}
            collectionEBooksData={collectionEBooksData}
            fetchCollectionDatas={fetchCollectionDatas}
            bookID={bookID}
            userData={userData}
            ></Modal>
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
                userData={userData}
                setMode={setMode}
                ></BookContainer>
               
                <div className={styles["review-section"]}>

                </div>
            </div>
        </>
    )
}