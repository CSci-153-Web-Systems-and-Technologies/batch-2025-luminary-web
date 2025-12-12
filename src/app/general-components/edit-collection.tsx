"use client"

import { ProfileModalMode } from '../user-profile-page/page'
import { createClient } from '../../../utils/supabase/client'
import {useState} from 'react'
import styles from './styles/edit-collection.module.css'
interface CollectionProps{
    setMode : (modalMode : ProfileModalMode)=>void, 
    collectionData : any,
    fetchCollection : ()=>void
}

enum EditMode{
    Main,
    EditUsername
}


export default function EditCollection({setMode, collectionData, fetchCollection} : CollectionProps){

    const supabase = createClient();
    const [editMode, setEditMode] = useState(EditMode.Main);
    const [collectionToEdit, setCollectionToEdit] = useState<any>(null);
    const [collectionText, setCollectionText] = useState<any>(null);
    async function deleteCollection(id : string){
        const {error} = await supabase.from('collections').delete().eq('id', id);
        if(error){
            alert("Failed to delete collection!");
        }
        else{
            alert("Collection Deleted!");
            fetchCollection();
            setMode(ProfileModalMode.Off);
        }
    }

    async function handleEditCollectionName(){
        const {error} = await supabase.from('collections').
        update({name : collectionText}).eq('id', collectionToEdit.id);

        if(error){
            alert("Error updating collection!");
        }
        else{
            alert("Collection rename successful!");
            fetchCollection();
            setMode(ProfileModalMode.Off);
        }
    }

    function handleInputChange(e : React.ChangeEvent<HTMLInputElement>){
        setCollectionText(e.currentTarget.value);
    }
    return(
        <>
            <div className={styles["modal-container"]} style={editMode === EditMode.Main? {} : {
                height : "max(min(20vw, 500px), 300px)"
            }}>
                <header>
                    <button onClick={

                        editMode === EditMode.EditUsername

                        ?
                        ()=>{
                            setEditMode(EditMode.Main);
                        }
                        :

                        ()=>{
                        setMode(ProfileModalMode.Off)
                        console.log("Modal off!")
                        }
                        
                        
                        }>

                        <img src=
                        {
                            editMode === EditMode.EditUsername 
                            ?
                            "/arrow-left.svg"
                            :

                            "cross.svg"} alt="" />
                    </button>
                    <h2>
                        Collections
                    </h2>

                    <div className={styles.balancer}>
                        {editMode === EditMode.EditUsername ? 
                        <button onClick={handleEditCollectionName}>
                            <img src="check.svg" alt="" />
                        </button>
                        : null}
                    </div>
                </header>
                <main>
                    {

                        editMode === EditMode.Main
                        ?


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
                                    return(
                                        <li key={index} className={styles['collections list']}>
                                            <p>
                                                {value.name}
                                            </p>
                                            <div className={styles.icons}>
                                                <button onClick={()=>{
                                                    setEditMode(EditMode.EditUsername);
                                                    setCollectionToEdit(value);
                                                }}>
                                                    <img src="/pencil.svg" alt="" />
                                                </button>
                                                <button onClick={()=>{deleteCollection(value.id)}}>
                                                    <img src="/delete.svg" alt="" />
                                                </button>
                                            </div>
                                        </li>
                                    )
                                }
                            )}

                        
                        </ul>
                    
                        :
                        <div className={styles.editModeDiv}>
                            <h1>Rename {collectionToEdit.name}</h1>
                            <input type="text" onChange={handleInputChange}/>
                        </div>
                    }
                </main>
            </div>
        </>
    )
}