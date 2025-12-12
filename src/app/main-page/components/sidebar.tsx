import styles from '../styles/sidebar.module.css'
import { useRouter } from 'next/navigation'
import { signout } from '../../../../lib/auth-actions'
interface SidebarProps{
    setSidebarEnabled : (boolean : boolean)=>void,
    userID : string,
}

export default function Sidebar({setSidebarEnabled, userID} : SidebarProps){
    const {push} = useRouter();
    function goToSearch(){
        push(`../../search-page`);
    }

    function goToFavorites(){
        push(`/favorites-page?userid=${userID}`);
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
            <button className={styles['navButton']} onClick={goToFavorites}>
                <span className={styles['buttonText']}>Favorites</span>
                <img src="./star.svg" alt="favorites icon"/>
            </button>
            <button className={styles['navButton']} onClick={signout}>
                <span className={styles['buttonText']}>Logout</span>
                <img src="./logout.svg" alt="logout icon"/>
            </button>
        </nav>
    </div>
    </>)
}