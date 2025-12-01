import styles from './styles/note-modal.module.css'

export default function AddNoteModal(){
    return(
        <>
            <div className={styles["modal-container"]}>
                <header>
                    <button>
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