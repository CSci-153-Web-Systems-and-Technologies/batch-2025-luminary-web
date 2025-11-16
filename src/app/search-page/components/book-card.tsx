"use client"
import { useRouter } from "next/navigation"
interface BookCardProp{
    imgUrl : string,
}
import styles from '../styles/results.module.css'
export default function BookCard({imgUrl} : BookCardProp){
    const {push} = useRouter();
    function openBookDetails(){
        push('../../book-info-page');
    }
    return(
        <>
            
            <div className={styles["cover-container"]} onClick={openBookDetails}>
                <img src={imgUrl} alt="book card" />
            </div>
            
        </>
    )
}

