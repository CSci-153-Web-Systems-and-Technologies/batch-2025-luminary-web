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
                            <div id="cover-container">
                                <img src="mock-data/percyjackson.jpg" alt="" />
                            </div>
                        </li>
                        <li >
                            <div id="cover-container">
                                <img src="mock-data/percyjackson.jpg" alt="" />
                            </div>
                        </li>
                        <li >
                            <div id="cover-container">
                                <img src="mock-data/percyjackson.jpg" alt="" />
                            </div>
                        </li>
                        <li >
                            <div id="cover-container">
                                <img src="mock-data/percyjackson.jpg" alt="" />
                            </div>
                        </li>
                        <li >
                            <div id="cover-container">
                                <img src="mock-data/percyjackson.jpg" alt="" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}