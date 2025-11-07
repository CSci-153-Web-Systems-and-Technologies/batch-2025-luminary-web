import Link from "next/link"
import './styles/mainpage.css';
import './styles/book-of-the-day.css'
import './styles/book-selection.css'
export default function MainLayout({children} : {children : React.ReactNode}){
    return(
        <>
        <body>
            {children}
        </body>
        </>
    )
}
