'use client';
import globalStyles from './styles/globals.module.css';
import headerStyles from './styles/header.module.css';

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PDFViewer from "./components/PDFViewer";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

//IMPORT MODALS:
import CollectionModal from '../general-components/collection-modal';
import AddNoteModal from '../general-components/note-modal';
import Options from '../general-components/options';
import AddCollection from '../general-components/addcollection-modal';
import { createClient } from '../../../utils/supabase/client';
export enum ModalMode{
    Chatbot,
    AddCollection,
    Collection,
    AddNote,
    Options,
    Off
}

interface ModalProps{
    modalMode : ModalMode, 
    setModalMode : (modalMode : ModalMode)=>void,
    setPageNumber : (page : number)=>void,
    page : number,
    collectionData : any,
    notesData : any,
    bookmarks : any,
    userID : string,
    bookID : string | null,
    fetchCollectionDatas : ()=>void,
    fetchNotesData : ()=>void,
    collectionEBooksData : any,
}
function Modal({modalMode, setModalMode, setPageNumber, page, collectionData, notesData, bookmarks, userID, bookID, fetchCollectionDatas, collectionEBooksData, fetchNotesData} : ModalProps){
        if(modalMode === ModalMode.Collection)

            return <CollectionModal 
        setMode={setModalMode} 
        modalMode={modalMode} 
        collectionData={collectionData} 
        collectionEBooksData={collectionEBooksData}
        fetchDatas={fetchCollectionDatas}
        bookID={bookID}>
        </CollectionModal>
        else if (modalMode === ModalMode.AddNote)

            return <AddNoteModal 
        setMode={setModalMode} 
        modalMode={modalMode}
        bookID={bookID}
        userID={userID}
        page={page}
        fetchNotesData={fetchNotesData}
        >

        </AddNoteModal>
        else if (modalMode === ModalMode.Options)

            return <Options 
        setMode={setModalMode} 
        setPageNumber={setPageNumber} 
        bookmarks={bookmarks} 
        notesData={notesData}>
        
        </Options>
        else if(modalMode === ModalMode.AddCollection)

            return <AddCollection 
        setMode={setModalMode} 
        modalMode={modalMode} 
        userID={userID} 
        bookID={bookID}
        fetchDatas={fetchCollectionDatas}>
        </AddCollection>
        return null;
}


interface bookToCache{
    bookID : string | null,
    page : string,
    imgUrl : string | null,
}
export default function Reader(){
    const supabase = createClient();

    



    const router = useRouter();
    const searchParams = useSearchParams();
    // console.log("Search Params : " + searchParams);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [modalMode, setModalMode] = useState(ModalMode.Off);
    const bookTitle = searchParams.get("booktitle");
    const author = searchParams.get("author");
    const bookURL = searchParams.get("pdfurl");
    const imgUrl = searchParams.get("imgurl");
    const bookID = searchParams.get("bookid");
    const [continueReading, setContinueReading] = useState<any>(null);
    // console.log(bookID);
    async function leavePage(){

        const bookToAdd : bookToCache = {
            bookID : bookID,
            page : pageNumber.toString(),
            imgUrl : imgUrl,
        }
        const tempContinueReading = continueReading;
        if(tempContinueReading && tempContinueReading?.length > 0){
            let bookAlreadyInList = false;
            let i = 0;
            for(i = 0; i < tempContinueReading.length; i++){
                if(bookToAdd.bookID === tempContinueReading[i].bookID){
                    bookAlreadyInList = true;
                    break;
                }
            }

            if(bookAlreadyInList){
                const modifiedList = tempContinueReading.filter((value, index) => index !== i);
                modifiedList.unshift(bookToAdd);
                const {error} = await supabase.from('profiles').update(
                    {
                        continuereading : modifiedList,
                    }
                ).eq('id', user.user_metadata.sub);
                if(error){
                    // alert("Error updating continuereading that already exists!");
                }else{
                    // alert("Successfully updated continuereading that already exists!")
                }
            }
            else{
                tempContinueReading.unshift(bookToAdd);
                if(tempContinueReading.length > 10){
                    tempContinueReading.pop();
                }
                const {error} = await supabase.from('profiles').update(
                    {
                        continuereading : tempContinueReading,
                    }
                ).eq('id', user.user_metadata.sub);
                if(error){
                    // alert("Error pushing new book to continuereading!");
                }
                else{
                    // alert("Successfully pushed new book to continuereading!");
                }
            }
        }else{
            const {error} = await 
            supabase.from('profiles').update({
                continuereading : [bookToAdd],
            }).eq('id', user.user_metadata.sub);

            if(error){
                // alert("Error inserting continuereading!");
            }
            else{
                // alert("continuereading pushed!");
            }
             
        }
        router.back();
    }


    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

    const setOff = () => {
        setModalMode(ModalMode.Off);
        console.log("Set Mode off!")
    }


    const [user, setUser] = useState<any>(null);
    useEffect(()=>{
        const fetchUser = async() => {
            const {
                data : {user},
            }  = await supabase.auth.getUser();
            setUser(user);
            console.log(user);
            const fetchContinueReading = async()=>{
                const {data, error} = await supabase.from('profiles').select('continuereading').eq('id', user?.user_metadata.sub).limit(1).single();
                if(error){
                    // alert("failed to get continuereading array!");
                }
                else{
                    // alert("Fetched continuereading array!");
                    // console.log("continuereading array:");
                    // console.log(data?.continuereading);
                }
                setContinueReading(data?.continuereading);
            }
            fetchContinueReading();
        }
        fetchUser();
        
    }, []);


    const [collectionData, setCollectionData] = useState<any>(null);
    const [notesData, setNotesData] = useState<any>(null);
    const [bookmarksData, setBookmarkData] = useState<any>(null)
    const [collectionEBooksData, setCollectionEBooksData] = useState<any>(null);
    const [bookmarksMap, setBookmarksMap] = useState<boolean[]>([]);
    function initBookmarksMap(data){
        console.log("Data: ");
        console.log(data);
        console.log(numPages);
        const tempMap = new Array(numPages + 1).fill(false);
        if(data){
            for(let i = 0; i < data.length; i++){
                tempMap[data[i].page] = true;
            }
            setBookmarksMap(tempMap);
            console.log("tempMap: ");
            console.log(tempMap);
        }
    }

    async function fetchCollectionData(){
        if(user){
                const {data, error} = await supabase.from('collections').select("*").eq('user_id', user.user_metadata.sub);
                if(error){
                    console.error("Error fetching collection!");
                }
                else{
                    // console.log("Collection Data: " + data);
                }
                setCollectionData(!error ? data : null);     
        }
    }
    async function fetchCollectionEBooksData(){
        if(user){
            const {data, error} = await supabase.from('collectionebook').select("*").eq('bookid', bookID).eq("user_id", user.user_metadata.sub);
                if(error){
                    console.error("Error fetching collectionebooks!");
                }
                else{
                    // console.log("Collection ebooks Data: " + data);
                }
                setCollectionEBooksData(!error ? data : null);
        }
    }
    async function fetchNoteData(){
        if(user){
            const {data, error} = await supabase.from('notes').select("*").eq('userid', user.user_metadata.sub);
                if(error){
                    console.error("Error fetching notes!");
                }
                else{
                    // console.log("Data: " + data);
                }
                setNotesData(!error ? data : null);
        }
    }
    async function fetchBookmarksData(){
        if(user){
            console.log(bookID + " " + user.user_metadata.sub);
            const {data, error} = await supabase.from('bookmarks').select("*").eq('userid', user.user_metadata.sub).eq('bookid', bookID);
                if(error){
                    console.error("Error fetching notes!");
                }
                else{
                    console.log("Bookmarks Data: " + data);
                    initBookmarksMap(data);
                }
                setBookmarkData(!error ? data : null);
                
        }
    }
    async function fetchDatas(){
        if(user){
            fetchCollectionData();
            fetchCollectionEBooksData();
            fetchNoteData();
            fetchBookmarksData();
        }
    }

    async function fetchCollectionDatas(){
        if(user){
            fetchCollectionData();
            fetchCollectionEBooksData();
        }
    }
    useEffect(()=>{
        fetchDatas();
    }, [user])

    useEffect(()=>{
        fetchDatas();
    }, [])

    function bookmarkAction(){
        console.log(bookmarksMap);
        
        if(!bookmarksMap[pageNumber]){
            addBookmark();
        }else{
            deleteBookmark();
        }
    }


    async function addBookmark(){
        const {data, error} = await supabase.from('bookmarks').insert([
            {
                bookid : bookID,
                userid : user.user_metadata.sub,
                page : pageNumber,
            }
        ]);
        if(error){
            alert("Failed to add bookmark!");
        }else{
            alert("Bookmark added!");
        }
        fetchBookmarksData();
    }

    async function deleteBookmark(){
        const {error} = await supabase.from('bookmarks').delete()
        .eq('bookid', bookID)
        .eq('userid', user.user_metadata.sub)
        .eq('page', pageNumber);
        if(error){
            alert("Error deleting page!");
        }
        else{
            alert("Bookmark deleted!");
        }
        fetchBookmarksData();
    }

    return(
            <>
               
                {/* <CollectionModal></CollectionModal> */}
                {/* <AddNoteModal></AddNoteModal> */}
                {/* <Options></Options> */}

                <Modal 
                modalMode={modalMode} 
                setModalMode={setModalMode} 
                setPageNumber={setPageNumber} 
                userID={ user?.user_metadata.sub } 
                bookID={bookID}
                collectionData={collectionData}
                notesData={notesData}
                bookmarks={bookmarksData}
                collectionEBooksData={collectionEBooksData}
                fetchCollectionDatas={fetchCollectionDatas}
                fetchNotesData={fetchNoteData}
                page={pageNumber}
                ></Modal>
                
                <header className={headerStyles['bookdoc-header']}>
                    <div className={headerStyles["left-hand-side"]}>
                        <button onClick={()=>{leavePage();}}>
                            <img src="arrow-left.svg" alt="arrow-left" />
                        </button>
                        <div className={headerStyles["book-info"]}>
                            <h1>
                                {bookTitle}
                                {/*To be replaced with {bookTitle} */}
                            </h1>
                            <p>
                                {author}
                                {/* 
                                *to be replaced with {author}
                                */}
                            </p>
                        </div>
                    </div>

                    <div className={headerStyles["right-hand-side"]}>
                        <button className={headerStyles["img-container"]} onClick={()=>{setModalMode(ModalMode.Collection)}}>
                            <img className={globalStyles['bookdoc-img']} src="add-collection.svg" alt="" />
                        </button>

                        {/* <button className={headerStyles["img-container"]}>
                            <img className={globalStyles['bookdoc-img']} src="contents.svg" alt="" />
                        </button> */}

                        <button className={headerStyles["img-container"]} onClick={()=>{setModalMode(ModalMode.AddNote)}}>
                            <img src="add-note.svg" alt="" />
                        </button>

                        <button className={headerStyles["img-container"]} onClick={()=>{setModalMode(ModalMode.Options)}}>
                            <img className={globalStyles['bookdoc-img']} src="kebab-menu.svg" alt="" />
                        </button>


                        <button className={headerStyles["mobile-img-container"]}>
                            <img className={globalStyles['bookdoc-img']} src="hamburgerButton.svg" alt="" />
                        </button>
                    </div>
                </header>
                <main className={globalStyles['bookdoc-main']}>
                        <PDFViewer 
                        book_url={bookURL}
                        pageNumber={pageNumber} 
                        numPages={numPages}
                        setNumPages={setNumPages}
                        />
                </main>
                <footer className={globalStyles['bookdoc-footer']}>
                    <nav className={globalStyles['bookdoc-nav']}>
                        <button onClick={bookmarkAction}>
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

