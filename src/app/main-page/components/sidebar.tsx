import styles from '../styles/sidebar.module.css'

interface SidebarProps{
    setSidebarEnabled : ()=>void,
}

export default function Sidebar({setSidebarEnabled} : SidebarProps){
    return(
    <>
    <div className={styles['sidebar']}>
        <h2>
            HELLO WORLD!
        </h2>
    </div>
    </>)
}