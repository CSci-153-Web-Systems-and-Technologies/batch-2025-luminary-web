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
    collectionData : any,
    notesData : any,
    bookmarks : any,
    userID : string,
    bookID : string | null,
}
function Modal({modalMode, setModalMode, setPageNumber, collectionData, notesData, bookmarks, userID, bookID} : ModalProps){
        if(modalMode === ModalMode.Collection)
            return <CollectionModal setMode={setModalMode} modalMode={modalMode} collectionData={collectionData}></CollectionModal>
        else if (modalMode === ModalMode.AddNote)
            return <AddNoteModal setMode={setModalMode} modalMode={modalMode}></AddNoteModal>
        else if (modalMode === ModalMode.Options)
            return <Options setMode={setModalMode} setPageNumber={setPageNumber} bookmarks={bookmarks} notesData={notesData}></Options>
        else if(modalMode === ModalMode.AddCollection)
            return <AddCollection setMode={setModalMode} modalMode={modalMode}></AddCollection>
        return null;
}


export default function Reader(){
    const supabase = createClient();

    



    const router = useRouter();
    const searchParams = useSearchParams();
    console.log("Search Params : " + searchParams);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [modalMode, setModalMode] = useState(ModalMode.Off);
    const bookTitle = searchParams.get("booktitle");
    const author = searchParams.get("author");
    const bookURL = searchParams.get("pdfurl");
    const bookID = searchParams.get("bookid");

    console.log(bookID);
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
        }
        fetchUser();
    }, []);


    const [collectionData, setCollectionData] = useState<any>(null);
    const [notesData, setNotesData] = useState<any>(null);
    const [bookmarksData, setBookmarkData] = useState<any>(null)
    useEffect(()=>{
        if(user){
            const fetchCollectionData = async()=>{
                const {data, error} = await supabase.from('collections').select("*").eq('id', user.user_metadata.sub);;
                if(error){
                    console.error("Error fetching collection!");
                }
                else{
                    console.log("Data: " + data);
                }
                setCollectionData(!error ? data : null);
            }
            
            const fetchNoteData = async()=>{
                const {data, error} = await supabase.from('collections').select("*").eq('id', user.user_metadata.sub);;
                if(error){
                    console.error("Error fetching notes!");
                }
                else{
                    console.log("Data: " + data);
                }
                setCollectionData(!error ? data : null);
            }

            fetchCollectionData();
        }
    }, [user])

    function AddBookmark(){
        
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
                ></Modal>
                
                <header className={headerStyles['bookdoc-header']}>
                    <div className={headerStyles["left-hand-side"]}>
                        <button onClick={()=>{router.back();}}>
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

