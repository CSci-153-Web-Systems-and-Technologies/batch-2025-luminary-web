import styles from './styles/note-modal.module.css'
import { ModalMode } from '../book-doc-page/page'
import { useState } from 'react'
import { createClient } from '../../../utils/supabase/client'

interface NoteModal{
    setMode : (modalMode : ModalMode)=>void, 
    modalMode : ModalMode
    bookID : string | null,
    userID : string,
    page : number,
    fetchNotesData : ()=>void
}
export default function AddNoteModal({setMode, modalMode, bookID, userID, page, fetchNotesData} : NoteModal){
    const supabase = createClient();
    const [note, setNote] = useState("");
    function changeNote(e : React.ChangeEvent<HTMLTextAreaElement>){
        setNote(e.target.value);
    }

    async function handleSubmit(){
        console.log(bookID);
        console.log(userID);
        const {data, error} = await supabase.from('notes').insert([
            {
                bookid : bookID,
                userid : userID,
                noteContent : note,
                page : page,
            }
        ]
        ).select();
        if(error){
            alert("Error adding note!");
        } 
        else{
            console.log(data);
            alert("Note added!");  
            fetchNotesData();
        }
        setNote("");
        setMode(ModalMode.Off);
    }
    
    return(
        <>
            <div className={styles["modal-container"]}>
                <header>
                    <button onClick={()=>{setMode(ModalMode.Off)}}>
                        <img src="cross.svg" alt="" />
                    </button>
                    <h2>
                        Note
                    </h2>
                    <button onClick={handleSubmit}>
                        <img src="plus.svg" alt="" />
                    </button>
                </header>
                <main>
                    <div>
                    <textarea 
                    defaultValue={note}
                    onChange={changeNote}name="note-contents" id="note-textbox" placeholder='Add note here. . .'></textarea>
                    <button>
                        <img src="robot.svg" alt="" />
                    </button>
                    </div>
                </main>
            </div>
        </>
    )
}