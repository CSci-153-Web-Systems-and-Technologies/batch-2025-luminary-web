"use client"

import styles from './styles/collection-modal.module.css'
import { ModalMode } from '../book-doc-page/page'

interface CollectionProps{
    setMode : (modalMode : ModalMode)=>void, 
    modalMode : ModalMode,
    collectionData : any,
}
export default function CollectionModal({setMode, modalMode, collectionData} : CollectionProps){
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
                        <li className={styles['collections list']}>
                            <p>
                                Childhood Books
                            </p>
                            <button>
                                <img src="add-to-collection-button.svg" alt="add-to-collection" />
                            </button>
                        </li>
                    </ul>
                </main>
            </div>
        </>
    )
}