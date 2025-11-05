"use client";
import { useState } from 'react';
import BookOfTheDay from './components/book-of-the-day';
export default function MainPage(){
    const [showNavBar, setShowNavBar] = useState(false);
    return(
        <>  
            <header>
                    <button>
                         <img src="./hamburgerButton.svg" alt="hamburger-button"/>
                    </button>
                    LUMINARY
                    <button className='profile-button'>
                        <img src="./profileButton.svg" alt="" />
                    </button>
                   
            </header>
            <main>
                <BookOfTheDay></BookOfTheDay>
            </main>
        </>
    )
}