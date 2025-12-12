import styles from '../../main-page/styles/book-selection.module.css'
import BookCard from '@/app/main-page/components/book-card'

interface AuthorSelectionProps{
    books : any,
}
export default function AuthorSelection({books} : AuthorSelectionProps){
    return(
        <>
            <div className={styles["book-selection"]}>
                <div className={styles["book-genre"]} style={{marginBottom : "20px"}}>
                    <span>
                        Published Books
                    </span>
                </div>
                <div className={styles["books"]}>
                    <ul className={styles["book-list"]}>
                        {books?.map((book, index) => {
                            return(
                                <li key={index}> 
                                    <BookCard imgUrl={book.image_url} bookID={book.id}></BookCard>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}