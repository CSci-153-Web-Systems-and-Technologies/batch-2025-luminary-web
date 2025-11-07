interface imageStyle{
    backgroundImage : string,
}
export default function BookOfTheDay(){

    const imgUrl = "";
    const botdImg : imageStyle = {
        backgroundImage : "url(" + imgUrl + "),linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))"
    }
    return(<>
        <div id="bookoftheday">
            <div id="botd-header">
                <h1>Book of the Day</h1>
            </div>
            <div id="book-card">
                <div id="img-container">
                        <img src="mock-data/percyjackson.jpg" alt="" />
                </div>
                <div id="book-details">
                    <div id="book-info">
                        <h1>Percy Jackson and the Olympians : The Lightning Thief</h1>    
                        <div id="author-genre">
                            <p>Rick Riordan | </p>
                            <p>Fantasy</p>
                        </div>
                    </div>
                    <div id="book-options">
                        <button id="favorite">
                            <img src="star.svg" alt="" />
                        </button>
                        <button id="add-to-collection">
                            <img src="add-collection.svg" alt="" />
                        </button>
                        <button id="read-now">
                            <div id="chevron-container">
                                <img id="chevron" src="chevron-right.svg" alt="" />
                            </div>
                            <div id="read-now-text">
                                Read Now
                            </div>
                        </button>
                    </div>
                    <div className="book-summary">
                        <p>
                            Twelve-year-old Percy Jackson is on the most dangerous quest of his life. With the help of a satyr and a daughter of Athena, Percy must journey across the United States to catch a thief who has stolen the original weapon of mass destruction — Zeus’ master bolt...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}