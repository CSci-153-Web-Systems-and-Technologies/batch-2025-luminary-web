interface imageStyle{
    backgroundImage : string,
}
import styles from '../styles/book-of-the-day.module.css'

export default function BookOfTheDay(){

    const imgUrl = "";
    const botdImg : imageStyle = {
        backgroundImage : "url(" + imgUrl + "),linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))"
    }
    return(<>
        <div className={styles["bookoftheday"]}>
            <div className={styles["botd-header"]}>
                <h1>Book of the Day</h1>
            </div>
            <div className={styles["book-card"]}>
                <div className={styles['img-container']}>
                        <img src="mock-data/percyjackson.jpg" alt="" />
                </div>
                <div className={styles["book-details"]}>
                    <div className={styles["book-info"]}>
                        <h1>Percy Jackson and the Olympians : The Lightning Thief</h1>    
                        <div className={styles["author-genre"]}>
                            <p>Rick Riordan | </p>
                            <p>Fantasy</p>
                        </div>
                    </div>
                    <div className={styles["book-options"]}>
                        <button className={styles["favorite"]}>
                            <img src="star.svg" alt="" />
                        </button>
                        <button className={styles["add-to-collection"]}>
                            <img src="add-collection.svg" alt="" />
                        </button>
                        <button className={styles["read-now"]}>
                            <div className={styles["chevron-container"]}>
                                <img id="chevron" src="chevron-right.svg" alt="" />
                            </div>
                            <div className={styles["read-now-text"]}>
                                Read Now
                            </div>
                        </button>
                    </div>
                    <div className={styles["book-summary"]}>
                        <p>
                            Twelve-year-old Percy Jackson is on the most dangerous quest of his life. With the help of a satyr and a daughter of Athena, Percy must journey across the United States to catch a thief who has stolen the original weapon of mass destruction — Zeus’ master bolt...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}