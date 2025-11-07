interface BookCardProp{
    imgUrl : string,
}

export default function BookCard({imgUrl} : BookCardProp){
    return(
        <>
            <div id="img-container">
                <img src="" alt="" />
            </div>
        </>
    )
}