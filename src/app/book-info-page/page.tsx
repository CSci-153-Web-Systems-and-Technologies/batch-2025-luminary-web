import BookContainer from "./components/BookContainer"
export default function BookInfoPage(){
    return(
        <>
            <div id="bookinfopage"> 
                <header>
                    <button id="close-button">
                        <img src="cross.svg" alt="close-button" />
                    </button>
                    
                    <h1>
                        LUMINARY
                    </h1>

                    <div id="empty-placeholder">

                    </div>
                </header>

                <BookContainer imgUrl="mock-data/ChamberOfSecrets.jpg" 
                bookTitle="Harry Potter and The Chamber Of Secrets" 
                author="JK Rowling" 
                genre="Fantasy"
                bookSummary="In Harry Potter and the Chamber of Secrets, Harry's second year at Hogwarts is disrupted by mysterious attacks that leave students petrified, while a voice whispers in the school walls, warning of the opening of the ancient Chamber of Secrets..."
                ></BookContainer>
               

            </div>
        </>
    )
}