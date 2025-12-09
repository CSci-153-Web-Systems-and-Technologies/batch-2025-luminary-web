"use client";
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/book-container.module.css'
interface BookContainerProps{
    bookID : string,
    imgUrl : string,
    bookTitle : string,
    author : string,
    genre : string,
    bookSummary : string,
    pdfUrl : string
}

const chapterListEnabledStyle =
{
    borderBottom : "4px solid white",
}

interface ReadChapterProps{
    bookID : string,
    isChapterMode : boolean,
    setChapterMode : (x : boolean) => void,
    bookTitle : string,
    author : string
    pdfUrl : string,

}
function ReadChapter({bookID, isChapterMode, setChapterMode, bookTitle, author, pdfUrl} : ReadChapterProps){
    const {push} = useRouter();

    function openBook(bookTitle : string, author : string, pdfUrl : string){
        console.log(bookTitle);
        console.log(author);
        console.log(pdfUrl);
        push(`../../book-doc-page?booktitle=${bookTitle}&author=${author}&pdfurl=${pdfUrl}&bookid=${bookID}`);
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
    bookID : string,
    bookTitle : string,
    author : string,
    genre : string,
    bookSummary : string,
    isMobile : boolean,
    isChapterMode : boolean,
    setChapterMode :  (x : boolean) => void,
    pdfUrl : string
}
function BookInfo({bookID, bookTitle, author, genre, bookSummary, isMobile, isChapterMode, setChapterMode, pdfUrl} : BookInfoProps){
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
                <button className={styles["favorite"]}>
                    <img src="/star.svg" alt="" />
                </button>
                <button className={styles["add-to-collection"]}>
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
export default function BookContainer( {bookID, imgUrl, bookTitle, author, genre, bookSummary, pdfUrl} : BookContainerProps){
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
                            pdfUrl={pdfUrl}
                            ></ReadChapter>
                       }
                    </div>
                    {!isChapterMode ? 
                    <BookInfo bookID={bookID}pdfUrl = {pdfUrl} bookTitle={bookTitle} author={author} genre={genre} bookSummary={bookSummary} isMobile={isMobile} isChapterMode={isChapterMode} setChapterMode={setChapterMode}></BookInfo>
                    : isMobile ? 
                    <BookInfo bookID={bookID} pdfUrl = {pdfUrl} bookTitle={bookTitle} author={author} genre={genre} bookSummary={bookSummary} isMobile={isMobile} isChapterMode={isChapterMode} setChapterMode={setChapterMode}></BookInfo>
                    :
                    <ChapterList isMobile={isMobile}></ChapterList>
                    }
                </div>
            </div>

        </>
    )
}