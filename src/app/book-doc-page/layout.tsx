import './styles/globals.css'
import './styles/header.css'
import Script from 'next/script'
export default function MainLayout({children} : {children : React.ReactNode}){
    return(
        <>
            {children}
            {/* <Script src='https://unpkg.com/pdfjs-dist@latest/build/pdf.min.mjs'></Script> */}
        </>
    )
}