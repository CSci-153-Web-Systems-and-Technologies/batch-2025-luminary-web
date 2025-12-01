"use client";
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/book-container.module.css'
interface BookContainerProps{
    imgUrl : string,
    bookTitle : string,
    author : string,
    genre : string,
    bookSummary : string,
}

const chapterListEnabledStyle =
{
    borderBottom : "4px solid white",
}

interface ReadChapterProps{
    isChapterMode : boolean,
    setChapterMode : (x : boolean) => void,
}
function ReadChapter({isChapterMode, setChapterMode} : ReadChapterProps){
    const {push} = useRouter();
    function openBook(){
        push('../../book-doc-page');
    }
    
    return(
        <div className={styles["read-chapter"]}>
            <button className={styles["read-now"]}
            onClick={openBook}
            >
                <div className={styles["chevron-container"]}>
                    <img className={styles["chevron"]} src="chevron-right.svg" alt="" />
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
    bookTitle : string,
    author : string,
    genre : string,
    bookSummary : string,
    isMobile : boolean,
    isChapterMode : boolean,
    setChapterMode :  (x : boolean) => void,
}
function BookInfo({bookTitle, author, genre, bookSummary, isMobile, isChapterMode, setChapterMode} : BookInfoProps){
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
                    <img src="star.svg" alt="" />
                </button>
                <button className={styles["add-to-collection"]}>
                    <img src="add-collection.svg" alt="" />
                </button>
            </div>
            {isMobile && 
                <ReadChapter isChapterMode={isChapterMode} setChapterMode={setChapterMode}></ReadChapter>
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
                        <img src="arrow-right.svg" alt="" />
                    </button>
                </li>
                <li>
                    <p>Chapter 2: Dobby{`'`}s Warning</p>
                    <button>
                        <img src="arrow-right.svg" alt="" />
                    </button>
                </li>
                <li>
                    <p>Chapter 3: The Burrow</p>
                    <button>
                        <img src="arrow-right.svg" alt="" />
                    </button>
                </li>
                <li>
                    <p>Chapter 4: At Flourish and Blotts</p>
                    <button>
                        <img src="arrow-right.svg" alt="" />
                    </button>
                </li>
            </ul>
        </div>
    )
}
export default function BookContainer( {imgUrl, bookTitle, author, genre, bookSummary} : BookContainerProps){
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
                            <ReadChapter isChapterMode={isChapterMode} setChapterMode={setChapterMode}></ReadChapter>
                       }
                    </div>
                    {!isChapterMode ? 
                    <BookInfo bookTitle={bookTitle} author={author} genre={genre} bookSummary={bookSummary} isMobile={isMobile} isChapterMode={isChapterMode} setChapterMode={setChapterMode}></BookInfo>
                    : isMobile ? 
                    <BookInfo bookTitle={bookTitle} author={author} genre={genre} bookSummary={bookSummary} isMobile={isMobile} isChapterMode={isChapterMode} setChapterMode={setChapterMode}></BookInfo>
                    :
                    <ChapterList isMobile={isMobile}></ChapterList>
                    }
                </div>
            </div>

        </>
    )
}