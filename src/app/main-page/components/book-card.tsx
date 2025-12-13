"use client"
import { useRouter } from 'next/navigation';
interface BookCardProp{
    imgUrl : string,
    bookID : string,
}
import styles from '../styles/book-selection.module.css'
import Link from 'next/link';
export default function BookCard({imgUrl, bookID} : BookCardProp){
    const {push} = useRouter();
    function openBookDetails(){
        if(bookID){
            push(`../../book-info-page?bookId=${bookID}`);
        }
    }

    return(
        <>
                <div className={styles["cover-container"]}>
                    <button onClick={openBookDetails}>
                    <img src={imgUrl} alt="book card" />
                    </button>
                </div>
            
        </>
    )
}

