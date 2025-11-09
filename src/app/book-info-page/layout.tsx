import './styles/book-info-page.css'
import './styles/book-container.css'
export default function BookInfoLayout({children} : {children : React.ReactNode}){
    return(
        <>
        <body>
            {children}
        </body>
        </>
    )
}
