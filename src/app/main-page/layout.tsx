import Link from "next/link"
import './styles/mainpage.css';
export default function MainLayout({children} : {children : React.ReactNode}){
    return(
        <>
        <body>
            {children}
        </body>
        </>
    )
}
