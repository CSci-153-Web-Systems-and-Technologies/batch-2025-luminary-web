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

export interface BookSelectionType{
    bookGenre : string,
    bookData : BookData[] | null,
    userData : any,
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

function ActualList({bookGenre, bookData, userData} : BookSelectionType ){
    return(
        <>
            {
                bookGenre === 'Continue Reading' ? 

                userData?.continuereading.map((book)=>{
                    const imgUrl : string = book.imgUrl;
                    const bookID : string = book.bookID;
                    return(
                        <li key={bookID}>

                            <BookCard imgUrl={imgUrl} bookID={bookID}></BookCard>
                        
                        </li>
                    )
                })

                :


                bookData?.map((book)=> {
                    if(bookGenre === book.genre){
                        return(
                            <li key={book.id}>
                                <BookCard imgUrl={book.image_url } bookID={book.id}></BookCard>
                            </li>
                        )
                    }
                })
            }
        </>
    )
}
export default function BookSelection( {bookGenre="", bookData, userData} : BookSelectionType )
{
    console.log("Continue reading: ");
    console.log(userData?.continuereading);
    if(bookData !== null){
        const book = bookData[0];
        // console.log(book.image_url);
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
                        {bookData === null ? <MockList></MockList> : <ActualList bookGenre={bookGenre} bookData={bookData} userData={userData}></ActualList>}
                    </ul>
                </div>
            </div>
        </>
    )
}


