import BookCard from "./book-card"
interface BookSelectionType{
    bookGenre : string,
}
export default function BookSelection( {bookGenre} : BookSelectionType )
{
    return(
        <>
            <div id="book-selection">
                <div id="book-genre">
                    <span>
                        {bookGenre}
                    </span>
                </div>
                <div id="books">
                    <ul id="book-list">
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