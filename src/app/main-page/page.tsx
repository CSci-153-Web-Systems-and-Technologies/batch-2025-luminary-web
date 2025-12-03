"use client";


import styles from './styles/mainpage.module.css';

import { useState } from 'react';
import BookOfTheDay from './components/book-of-the-day';
import BookSelection from './components/book-selections';
import { createClient } from '../../../utils/supabase/server';

export default function MainPage(){

    const [showNavBar, setShowNavBar] = useState(false);
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
                <BookOfTheDay></BookOfTheDay>
                <BookSelection bookGenre='Continue Reading'></BookSelection>
                <BookSelection bookGenre='Fantasy'></BookSelection>
                <BookSelection bookGenre='Romance'></BookSelection>
            </main>
        </>
    )
}