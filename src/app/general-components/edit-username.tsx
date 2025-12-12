"use client"
import styles from './styles/edit-username.module.css'
import { useState } from "react"
import { createClient } from '../../../utils/supabase/client'
interface EditUsernameProps{
    userID : string,
    setModalMode : (modalMode : ProfileModalMode)=>void,
    fetchUser : ()=>Promise<void>,
}

import { ProfileModalMode } from '../user-profile-page/page';

export default function EditUsername({userID, setModalMode, fetchUser}:  EditUsernameProps){
    
    const [usernameText, setUsernameText] = useState("");
    const supabase = createClient();
    function updateUsernameText( e : React.ChangeEvent<HTMLInputElement>){
        setUsernameText(e.currentTarget.value);
    }
    
    async function editUsername(){
        const {error} = await supabase.from('profiles').update({full_name : usernameText}).eq("id", userID);
        if(error){
            alert("Error updating table!");
        }
        setModalMode(ProfileModalMode.Off);
        fetchUser();
    }
    
    return(
        <>
            <div className={styles['modal-container']}>
                 <header>
                    <button onClick={()=>{setModalMode(ProfileModalMode.Off)}}>
                        <img src="/cross.svg" alt="" />
                    </button>
                    <h2>
                        Edit username
                    </h2>
                    <button onClick={editUsername}>
                        <img src="/check.svg" alt="" />
                    </button>
                </header>

                <main>
                    <input type="text" onChange={updateUsernameText} placeholder="Enter Collection Name"name="collectionName" id=""></input>
                </main>
            </div>
        </>
    )
}