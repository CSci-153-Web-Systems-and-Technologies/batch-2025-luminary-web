import styles from './styles/note-modal.module.css'
import { ModalMode } from '../book-doc-page/page'
interface NoteModal{
    setMode : (modalMode : ModalMode)=>void, 
    modalMode : ModalMode
}
export default function AddNoteModal({setMode, modalMode} : NoteModal){
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
                    <button>
                        <img src="plus.svg" alt="" />
                    </button>
                </header>
                <main>
                    <div>
                    <textarea name="note-contents" id="note-textbox" placeholder='Add note here. . .'></textarea>
                    <button>
                        <img src="robot.svg" alt="" />
                    </button>
                    </div>
                </main>
            </div>
        </>
    )
}