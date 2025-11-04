import Link from "next/link"
import './components/login.css';
export default function MainLayout({children} : {children : React.ReactNode}){
    return(
        <>
        <body>
            {children}
        </body>
        </>
    )
}