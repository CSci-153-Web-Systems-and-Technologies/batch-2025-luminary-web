import BookCard from "./book-card"
import styles from "../styles/book-selection.module.css"
interface BookSelectionType{
    bookGenre : string,
}
export default function BookSelection( {bookGenre} : BookSelectionType )
{
    return(
        <>
            <div className={styles["book-selection"]}>
                <div className={styles["book-genre"]}>
                    <span>
                        {bookGenre}
                    </span>
                </div>
                <div className={styles["books"]}>
                    <ul className={styles["book-list"]}>
                        <li >
                            <BookCard imgUrl="mock-data/percyjackson.jpg"></BookCard>
                        </li>
                        <li >
                            <BookCard imgUrl="mock-data/percyjackson.jpg"></BookCard>
                        </li>
                        <li >
                            <BookCard imgUrl="mock-data/percyjackson.jpg"></BookCard>
                        </li>
                        <li >
                            <BookCard imgUrl="mock-data/percyjackson.jpg"></BookCard>
                        </li>                        
                        <li >
                            <BookCard imgUrl="mock-data/percyjackson.jpg"></BookCard>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}