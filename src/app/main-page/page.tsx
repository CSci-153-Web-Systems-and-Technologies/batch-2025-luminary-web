"use client";


import styles from './styles/mainpage.module.css';

import { useState, useEffect } from 'react';
import BookOfTheDay from './components/book-of-the-day';
import BookSelection from './components/book-selections';
import { createClient } from '../../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import Sidebar from './components/sidebar'
export default function MainPage(){
    const {push} = useRouter();
    // const [showNavBar, setShowNavBar] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const supabase = createClient();
    const [isAdminPage, setIsAdminPage] = useState(false);
    const [bookData, setBookData] = useState<any>(null);
    const [sidebarEnabled, setSidebarEnabled] = useState(false);
    useEffect(()=> {
        const fetchUser = async() => {
            const {
                data : {user},
            }  = await supabase.auth.getUser();
            setUser(user);
            console.log(user);
        }
        fetchUser();

    }, [])

    useEffect(()=> {
        const fetchUserData = async()=>{
            if(user){
                const {data, error} = await supabase.from('profiles').select('*').eq('id', user.user_metadata.sub).limit(1).single();
                if(error){
                    console.error("Error fetching id");
                }
                else{
                    console.log(data);
                }
                setUserData(!error ? data : null);
                setIsAdminPage(data.isAdmin);
            }
        }
        fetchUserData();
        
    }, [user])

    useEffect(()=>{
        const fetchBookData = async()=>{
            const {data, error} = await supabase.from('books').select("*");
            if(error){
                console.error("Error fetching books!");
            }
            else{
                console.log(data);
            }
            setBookData(!error ? data : null);
        }
        
        fetchBookData();
    }, [])

    return(
        <>  
            {sidebarEnabled ? <Sidebar setSidebarEnabled={setSidebarEnabled} userID={userData.id}></Sidebar> : null}
            <header className={styles.mainheader}>
                    <button onClick={()=>{setSidebarEnabled(true)}}
                        style={sidebarEnabled? {visibility : "hidden",} : {}}>
                         <img src="./hamburgerButton.svg" alt="hamburger-button"/>
                    </button>
                    LUMINARY
                    <button className='profile-button' onClick={isAdminPage ?
                        ()=>{
                            push('/admin-page');
                        }
                        :
                        ()=>{
                            push(`/user-profile-page?userID=${user.user_metadata.sub}`);
                            // `../../book-doc-page?booktitle=${bookTitle}&author=${author}&pdfurl=${pdfUrl}&bookid=${bookID}`
                        }
                    }>
                        <img src={isAdminPage ? "./plus.svg" : "./profile.svg"} alt="profile-button"/>
                    </button>
            </header>
            
            <main className={styles.mainbody}>
                {/* {user !== null ? <p>hello {user.user_metadata.full_name} </p>: <p>You are not logged in.</p>} */}
                <BookOfTheDay></BookOfTheDay>
                {userData?.continuereading ? 
                <>
                    <BookSelection bookGenre='Continue Reading' bookData={bookData} userData={userData}></BookSelection>
                </>:null}
                <BookSelection bookGenre='Fantasy' bookData={bookData} userData={userData}></BookSelection>
                <BookSelection bookGenre='Romance' bookData={bookData} userData={userData}></BookSelection>
            </main>
        </>
    )
}