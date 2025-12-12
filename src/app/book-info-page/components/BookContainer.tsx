"use client";
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/book-container.module.css'
import { createClient } from '../../../../utils/supabase/client';
import { isLocalFileSystem } from 'react-pdf/dist/shared/utils.js';
import { ModalMode } from '@/app/book-doc-page/page';

const chapterListEnabledStyle =
{
    borderBottom : "4px solid white",
}

interface ReadChapterProps{
    bookID : string | null,
    isChapterMode : boolean,
    setChapterMode : (x : boolean) => void,
    bookTitle : string,
    author : string,
    pdfUrl : string,

}
function ReadChapter({bookID, isChapterMode, setChapterMode, bookTitle, author, imgUrl, pdfUrl, userData} : ReadChapterProps){
    
    let isCached = false;
    let index = 0;
    if(userData){
        const continueReading = userData[0].continuereading;
        if(continueReading){
            for(let i = 0; i < continueReading?.length; i++){
                if(bookID === continueReading[i]?.bookID){
                    isCached=true;
                    index = i;
                    break;
                }
            }
        }
    }
    const {push} = useRouter();
    function openBook(bookTitle : string, author : string, pdfUrl : string){
        console.log(bookTitle);
        console.log(author);
        console.log(pdfUrl);

        const url =  `../../book-doc-page?booktitle=${bookTitle}&author=${author}&pdfurl=${pdfUrl}&bookid=${bookID}&imgurl=${imgUrl}` + (isCached ? `&cachedpage=${userData[0].continuereading[index].page}` : '')
        push(url);
    }
    return(
        <div className={styles["read-chapter"]}>
            <button className={styles["read-now"]}
            onClick={()=>{ openBook(bookTitle, author, pdfUrl)}}
            >
                <div className={styles["chevron-container"]}>
                    <img className={styles["chevron"]} src="/chevron-right.svg" alt="" />
                </div>
                <div className={styles["read-now-text"]}>
                    Read Now
                </div>
                </button>
                <button className={styles["chapterlist"]} style={isChapterMode ? chapterListEnabledStyle : {}}
                        onClick={() => {setChapterMode(!isChapterMode)}}>
                Chapter List
                </button>
        </div>
    )
}
interface BookInfoProps{
    bookID : string | null,
    bookTitle : string,
    author : string,
    genre : string,
    bookSummary : string,
    isMobile : boolean,
    isChapterMode : boolean,
    setChapterMode :  (x : boolean) => void,
    pdfUrl : string,
    setMode : (mode : ModalMode)=>void,
}

function BookInfo({bookID, bookTitle, author, genre, bookSummary, isMobile, isChapterMode, setChapterMode, pdfUrl, setMode} : BookInfoProps){
    const supabase = createClient();
    const [favorite, setFavorite] = useState(false);
    const[user, setUser] = useState<any>(null);
    useEffect(()=>{
        if(bookID && supabase){
            const getUser = async()=>{
                const {data : {user}} = await supabase.auth.getUser();
                setUser(user);

                const {data, error} = await supabase.from('favorites').select('*').eq('book_id', bookID).eq('user_id', user?.id);
                setFavorite((data && data.length > 0 ? true : false));
            }   
            getUser();
        }
    }, [bookID])



    const fetchFavorite = async()=>{
        const {data, error} = await supabase.from('favorites').select('*').eq('book_id', bookID).eq('user_id', user.id);

        setFavorite((data && data.length > 0 ? true : false));
    }

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
                'user_id' : user.id,
            }
        ])    
        if(error){
            alert("Error adding to favorites!")
        }
        else{
            // alert("Added to favorites!");
            fetchFavorite();
        }
    }

    async function deleteFromFavorites(){
        const {error} = await supabase.from('favorites').delete().eq("book_id", bookID).eq("user_id", user.id);
        if(error){
            alert("Error deleting from favorites!");
        }
        else{
            // alert("Deleted from favorites!");
            fetchFavorite();
        }
    }
    
    
    
    
    return (
        <div className={styles["book-information"]}>
            <div className={styles["book-info"]}>
                <h1>{bookTitle}</h1>    
                <div className={styles["author-genre"]}>
                    <p>{author} | </p>
                    <p>{genre}</p>
                    {/* <p>isMobile: {isMobile.toString()}</p> */}
                </div>
            </div>
            <div className={styles["book-options"]}>
                <button className={styles["favorite"]}
                onClick={favoriteAction}>
                    <img src={favorite ? "/favored-star.svg" : "/star.svg"} alt="" />
                </button>
                <button className={styles["add-to-collection"]} onClick={()=>{setMode(ModalMode.Collection)}}>
                    <img src="/add-collection.svg" alt="" />
                </button>
            </div>
            {isMobile && 
                <ReadChapter bookID={bookID} isChapterMode={isChapterMode} setChapterMode={setChapterMode} bookTitle={bookTitle}
                            author={author}
                            pdfUrl={pdfUrl}></ReadChapter>
            }
            {
            !isChapterMode ?  
            <div className={styles["book-summary"]}>
                <p>
                    {bookSummary}
                </p>
            </div>
            :
            <ChapterList isMobile={isMobile}></ChapterList>
            }
        </div>
    )
}

interface ChapterListProps{
    isMobile : boolean,
}
function ChapterList({isMobile} : ChapterListProps){
    return(
        <div className={styles['chapter-list']}>
            {!isMobile && 
            <h1>
                Chapters:
            </h1>
            }
            <ul>
                <li>
                    <p>Chapter 1: The Worst Birthday</p>
                    <button>
                        <img src="/arrow-right.svg" alt="" />
                    </button>
                </li>
                <li>
                    <p>Chapter 2: Dobby{`'`}s Warning</p>
                    <button>
                        <img src="/arrow-right.svg" alt="" />
                    </button>
                </li>
                <li>
                    <p>Chapter 3: The Burrow</p>
                    <button>
                        <img src="/arrow-right.svg" alt="" />
                    </button>
                </li>
                <li>
                    <p>Chapter 4: At Flourish and Blotts</p>
                    <button>
                        <img src="/arrow-right.svg" alt="" />
                    </button>
                </li>
            </ul>
        </div>
    )
}

interface BookContainerProps{
    bookID : string | null,
    imgUrl : string,
    bookTitle : string,
    author : string,
    genre : string,
    bookSummary : string,
    pdfUrl : string,
    isPending : string | null,
    userData : any,
    setMode : (mode : ModalMode)=>void,
}


export default function BookContainer( {bookID, imgUrl, bookTitle, author, genre, bookSummary, pdfUrl, isPending, userData, setMode} : BookContainerProps){
    const isSSR = typeof window === "undefined";
    const [isChapterMode, setChapterMode] = useState(false);
    const [width, setWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
            setIsMobile(window.innerWidth <= 700);
    }
    useEffect(() => {
        handleWindowSizeChange();
    })
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return (
        <>
                <div className={styles["book-container"]}>
                <div className={styles["outer-container"]}>
                    <div className={styles["book-img-options"]}>
                        <div className={styles["book-img-container"]}>
                            <img src={imgUrl} alt="book-img" />
                        </div>
                       {!isMobile && 
                            <ReadChapter 
                            bookID={bookID}
                            isChapterMode={isChapterMode} 
                            setChapterMode={setChapterMode}
                            bookTitle={bookTitle}
                            author={author}
                            imgUrl={imgUrl}
                            pdfUrl={pdfUrl}
                            userData={userData}
                            ></ReadChapter>
                       }
                    </div>
                    {!isChapterMode ? 
                    <BookInfo bookID={bookID}pdfUrl = {pdfUrl} bookTitle={bookTitle} author={author} genre={genre} bookSummary={bookSummary} isMobile={isMobile} isChapterMode={isChapterMode} setChapterMode={setChapterMode} setMode={setMode}></BookInfo>
                    : isMobile ? 
                    <BookInfo bookID={bookID} pdfUrl = {pdfUrl} bookTitle={bookTitle} author={author} genre={genre} bookSummary={bookSummary} isMobile={isMobile} isChapterMode={isChapterMode} setChapterMode={setChapterMode} setMode={setMode}></BookInfo>
                    :
                    <ChapterList isMobile={isMobile}></ChapterList>
                    }
                </div>
            </div>

        </>
    )
}