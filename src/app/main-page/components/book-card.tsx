interface BookCardProp{
    imgUrl : string,
}

export default function BookCard({imgUrl} : BookCardProp){
    return(
        <>
            <div id="cover-container">
                <img src={imgUrl} alt="book card" />
            </div>
        </>
    )
}

