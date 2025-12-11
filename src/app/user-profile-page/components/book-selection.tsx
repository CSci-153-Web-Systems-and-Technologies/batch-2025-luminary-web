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
    collection : any,
    collectionsEBook : {collectionid : string, bookid : string}[] | null,
    hashMap : any,
}

import styles from '../../main-page/styles/book-selection.module.css'
import BookCard from '@/app/main-page/components/book-card'
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

function ActualList({collection, collectionsEBook, hashMap} : BookSelectionType ){
    return(
        <>
            {
                collectionsEBook?.map((book, index)=> {
                    if(book.collectionid === collection.id){
                        const bookData = hashMap.get(book.bookid);
                        return(
                            <li key={index}>
                                <BookCard imgUrl={bookData.image_url} bookID={bookData.id}></BookCard>
                            </li>
                        )
                    }
                })
            }
        </>
    )
}

export default function BookSelection( {collection, collectionsEBook , hashMap} : BookSelectionType )
{
    console.log("Filtered array: ");
    console.log(collectionsEBook);
    return(
        <>
            <div className={styles["book-selection"]}>
                <div className={styles["book-genre"]} style={{marginBottom : "20px"}}>
                    <span>
                        {collection.name}
                    </span>
                </div>
                <div className={styles["books"]}>
                    <ul className={styles["book-list"]}>
                        {collectionsEBook?.length > 0
                         ?
                         <ActualList collection={collection} collectionsEBook={collectionsEBook} hashMap={hashMap}></ActualList>
                         :
                         <div className={styles.contingency}>
                            This collection is empty.
                         </div>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
