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
        push(`../../book-info-page/${bookID}`);
    }
    return(
        <>
                <div className={styles["cover-container"]}>
                    <Link prefetch={false}href={
                        {
                            pathname : `/book-info-page/bookId`,
                            query : {
                                bookId : bookID,
                            },
                        }
                    }
                    as={`/book-info-page/${bookID}` }
                    >
                    <img src={imgUrl} alt="book card" />
                    </Link>
                </div>
            
        </>
    )
}

