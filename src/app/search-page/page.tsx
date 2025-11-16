
import styles from './styles/search.module.css'
import resultStyles from './styles/results.module.css'
import BookCard from './components/book-card'

export default function SearchPage(){
    return(
    <>
    <div className={styles['parent-div']}>
        <header className={styles["search-header"]}>
            <button>
                <img src="arrow-left.svg" alt="" />
            </button>
            <h1>
                LUMINARY
            </h1>
            <div className={styles["empty-container"]}>

            </div>
        </header>
        <main className={styles['search-main']}>
            <div className={styles['searchbar']}>
                <input type="text" placeholder='Search'/>
                <img src="search.svg" alt="" />
            </div>
            <div className={resultStyles['results']}>
                <ul>
                    <li>
                        <BookCard imgUrl='mock-data/ChamberOfSecrets.jpg'></BookCard>
                    </li>
                    <li>
                        <BookCard imgUrl='mock-data/ChamberOfSecrets.jpg'></BookCard>
                    </li>
                    <li>
                        <BookCard imgUrl='mock-data/ChamberOfSecrets.jpg'></BookCard>
                    </li>
                    <li>
                        <BookCard imgUrl='mock-data/ChamberOfSecrets.jpg'></BookCard>
                    </li>
                </ul>
            </div>
        </main>
        </div>
    </>)

}