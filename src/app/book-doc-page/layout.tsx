import './styles/globals.css'

export default function MainLayout({children} : {children : React.ReactNode}){
    return(
        <>
        <body>
            {children}
        </body>
        </>
    )
}