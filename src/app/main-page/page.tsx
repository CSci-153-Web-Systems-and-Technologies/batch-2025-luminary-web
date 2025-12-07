"use client";


import styles from './styles/mainpage.module.css';

import { useState, useEffect } from 'react';
import BookOfTheDay from './components/book-of-the-day';
import BookSelection from './components/book-selections';
import { createClient } from '../../../utils/supabase/client';

export default function MainPage(){

    // const [showNavBar, setShowNavBar] = useState(false);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    useEffect(() => {
        const fetchUser = async() => {
            const {
                data : {user},
            }  = await supabase.auth.getUser();
            setUser(user);
        }
        fetchUser();
    }, [])
    return(
        <>  
            <header className={styles.mainheader}>
                    <button>
                         <img src="./hamburgerButton.svg" alt="hamburger-button"/>
                    </button>
                    LUMINARY
                    <button className='profile-button'>
                        <img src="./profileButton.svg" alt="profile-button"/>
                    </button>
            </header>
            
            <main className={styles.mainbody}>
                {user !== null ? <p>hello {user.user_metadata.full_name} </p>: null}
                <BookOfTheDay></BookOfTheDay>
                <BookSelection bookGenre='Continue Reading'></BookSelection>
                <BookSelection bookGenre='Fantasy'></BookSelection>
                <BookSelection bookGenre='Romance'></BookSelection>
            </main>
        </>
    )
}