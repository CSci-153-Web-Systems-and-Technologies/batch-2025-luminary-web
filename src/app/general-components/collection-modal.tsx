"use client"

import styles from './styles/collection-modal.module.css'
import { ModalMode } from '../book-doc-page/page'
import { createClient } from '../../../utils/supabase/client'
interface CollectionProps{
    setMode : (modalMode : ModalMode)=>void, 
    modalMode : ModalMode,
    collectionData : any,
    collectionEBooksData : any,
    bookID : any
    fetchDatas : ()=>void
}



export default function CollectionModal({setMode, modalMode, collectionData, bookID, collectionEBooksData, fetchDatas} : CollectionProps){

    const supabase = createClient();


    async function removeFromCollection(value : any){
        console.log(value.id);
        const response = await supabase.from("collectionebook").delete().eq("collectionid", value.id);

    
        // alert("Removed from collection!");
        console.log(response);
        
        fetchDatas();
    }

    async function addToCollection(value : any){
        const {data, error} = await supabase.from("collectionebook").insert(
            [{
                collectionid : value.id, 
                bookid : bookID,
                user_id : value.user_id,
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
            <div className={styles["modal-container"]}>
                <header>
                    <button onClick={
                        ()=>{
                        setMode(ModalMode.Off)
                        console.log("Modal off!")
                        }}>
                        <img src="cross.svg" alt="" />
                    </button>
                    <h2>
                        Collections
                    </h2>
                    <button onClick={
                                ()=>{
                                    setMode(ModalMode.AddCollection)
                                }}>
                        <img src="plus.svg" alt="" />
                    </button>
                </header>
                <main>
                    <ul>

                        {collectionData.length === 0 ? 
                        <div>
                            <h1 style={{color : "#aeaeaeff"}}>
                                You have no collections.
                            </h1>
                        </div>
                        : null}
                        {collectionData.map(
                            (value, index)=>{
                                let containsValue : boolean = false;
                                
                                for(let i = 0; i < collectionEBooksData.length; i++){
                                    if(value.id === collectionEBooksData[i].collectionid)
                                        containsValue = true;
                                }
                                return(
                                    <li key={index} className={styles['collections list']}>
                                        <p>
                                            {value.name}
                                        </p>
                                        <button onClick={containsValue ? 
                                            ()=>{
                                                removeFromCollection(value)
                                            } :
                                            ()=>{
                                                addToCollection(value)
                                            }
                                        }>
                                            
                                            <img src={containsValue ? "./already-in-collection.svg" : "./add-to-collection-button.svg"}alt="add-to-collection" />
                                        </button>
                                    </li>
                                )
                            }
                        )}

                        
                    </ul>
                </main>
            </div>
        </>
    )
}