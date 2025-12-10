import styles from './styles/add-collection.module.css'
import { ModalMode } from '../book-doc-page/page'
import { useState } from 'react'
import {ChangeEvent} from 'react'
import { createClient } from '../../../utils/supabase/client'
interface CollectionProps{
    setMode : (modalMode : ModalMode)=>void, 
    modalMode : ModalMode,
    userID : string,
    bookID : string | null,
    fetchDatas : ()=>void,
}


export default function AddCollection({setMode, modalMode, userID, bookID, fetchDatas} : CollectionProps){
    const supabase = createClient();
    const [collectionName, setCollectionName] = useState("");
    
    function goBack(){
        setMode(ModalMode.Collection)
    }

    function updateCollectionName(e : ChangeEvent<HTMLTextAreaElement>){
        setCollectionName(e.currentTarget.value);
    }
    async function createCollection(){
        //code for adding collection.
        
        const {data, error} = await supabase.from("collections").insert(
            [{
                user_id : userID, 
                name : collectionName,
            }]
        ).select();

        if(error){
            alert("Failed to create collection!");
        }
        else{
            alert("Collection created!")
            console.log(data);
        }
        const newRow = data ? data[0] : null;

        addCollection(newRow.id);
        
        setMode(ModalMode.Off);
    }

    async function addCollection(collection_id : string){
        const {data, error} = await supabase.from("collectionebook").insert(
            [{
                collectionid : collection_id, 
                bookid : bookID,
                user_id : userID,
            }]
        ).select();

        if(error){
            alert("Failed to add to collection!");
        }
        else{
            alert("Added to collection!");
            console.log(data);
        }
        fetchDatas();
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
                    <button onClick={createCollection}>
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