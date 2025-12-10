import styles from '../styles/sidebar.module.css'
import { useRouter } from 'next/navigation'
interface SidebarProps{
    setSidebarEnabled : (boolean : boolean)=>void,
}

export default function Sidebar({setSidebarEnabled} : SidebarProps){
    const {push} = useRouter();
    function goToSearch(){
        push(`../../search-page`);
    }
    return(
    <>
    <div className={styles['sidebar']}>
        <div className={styles['header']}>
            <button className={styles['closeButton']} onClick={()=>{setSidebarEnabled(false)}}>
                <img src="./hamburgerButton.svg" alt="close sidebar"/>
            </button>
        </div>
        <nav className={styles['navButtons']}>
            <button className={styles['navButton']} onClick={goToSearch}>
                <span className={styles['buttonText']}>Search</span>
                <img src="./search.svg" alt="search icon"/>
            </button>
            <button className={styles['navButton']}>
                <span className={styles['buttonText']}>Favorites</span>
                <img src="./star.svg" alt="favorites icon"/>
            </button>
            <button className={styles['navButton']}>
                <span className={styles['buttonText']}>Logout</span>
                <img src="./logout.svg" alt="logout icon"/>
            </button>
        </nav>
    </div>
    </>)
}