import BookCard from "./book-card"
import styles from "../styles/book-selection.module.css"
interface BookData{
    id : string,
    author : string,
    book_title : string,
    description : string,
    genre : string,
    image_url : string,
    pdf_url : string,
}

interface BookSelectionType{
    bookGenre : string,
    bookData : BookData[] | null,
}
function MockList(){
    return(
        <>
            <li>
                <BookCard imgUrl="mock-data/percyjackson.jpg" bookID=""></BookCard>
            </li>
            <li >
                <BookCard imgUrl="mock-data/percyjackson.jpg" bookID=""></BookCard>
            </li>
            <li>
                <BookCard imgUrl="mock-data/percyjackson.jpg" bookID=""></BookCard>
            </li>
            <li >
                <BookCard imgUrl="mock-data/percyjackson.jpg" bookID=""></BookCard>
            </li>
            <li >
                <BookCard imgUrl="mock-data/percyjackson.jpg" bookID=""></BookCard>
            </li>
            
        </>
    )

}

function ActualList({bookGenre, bookData} : BookSelectionType ){
    return(
        <>
            {
                bookData?.map((book)=> {
                    if(bookGenre === book.genre){
                        return(
                            <li key={book.id}>
                                <BookCard imgUrl={book.image_url} bookID={book.id}></BookCard>
                            </li>
                        )
                    }
                })
            }
        </>
    )
}
export default function BookSelection( {bookGenre, bookData} : BookSelectionType )
{

    if(bookData !== null){
        const book = bookData[0];
        console.log(book.image_url);
    }
    
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
                        {bookData === null ? <MockList></MockList> : <ActualList bookGenre ={bookGenre} bookData={bookData}></ActualList>}
                    </ul>
                </div>
            </div>
        </>
    )
}