"use client";
import BookContainer from "./components/BookContainer"
import styles from './styles/book-info-page.module.css'
import { useRouter } from "next/navigation"
export default function BookInfoPage(){
    const {back} = useRouter();
    return(
        <>
            <div className={styles["bookinfopage"]}> 
                <header className={styles["bookinfo-header"]}>
                    <button className={styles["close-button"]}
                            onClick={()=>{back();}}>
                        <img src="cross.svg" alt="close-button" />
                    </button>
                    
                    <h1>
                        LUMINARY
                    </h1>

                    <div className={styles["empty-placeholder"]}>

                    </div>
                </header>

                <BookContainer imgUrl="mock-data/ChamberOfSecrets.jpg" 
                bookTitle="Harry Potter and The Chamber Of Secrets" 
                author="JK Rowling" 
                genre="Fantasy"
                bookSummary="In Harry Potter and the Chamber of Secrets, Harry's second year at Hogwarts is disrupted by mysterious attacks that leave students petrified, while a voice whispers in the school walls, warning of the opening of the ancient Chamber of Secrets..."
                ></BookContainer>
               

            </div>
        </>
    )
}