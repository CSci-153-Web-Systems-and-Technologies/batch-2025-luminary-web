import styles from './styles/add-collection.module.css'
import { ModalMode } from '../book-doc-page/page'
import { useState } from 'react'
import {ChangeEvent} from 'react'
import { createClient } from '../../../utils/supabase/client'
interface CollectionProps{
    setMode : (modalMode : ModalMode)=>void, 
    modalMode : ModalMode
}
export default function AddCollection({setMode, modalMode} : CollectionProps){
    const [collectionName, setCollectionName] = useState("");
    
    function goBack(){
        setMode(ModalMode.Collection)
    }

    function updateCollectionName(e : ChangeEvent<HTMLTextAreaElement>){
        setCollectionName(e.currentTarget.value);
    }
    function addCollection(){
        //code for adding collection.
        
        alert("Added to collection!");
        setMode(ModalMode.Off);
    }
    return(
        <>
            <div className={styles['modal-container']}>
                 <header>
                    <button onClick={goBack}>
                        <img src="/arrow-left.svg" alt="" />
                    </button>
                    <h2>
                        Collections
                    </h2>
                    <button onClick={addCollection}>
                        <img src="plus.svg" alt="" />
                    </button>
                </header>

                <main>
                    <textarea onChange={updateCollectionName} placeholder="Enter Collection Name"name="collectionName" id=""></textarea>
                </main>
            </div>
        </>
    )
}