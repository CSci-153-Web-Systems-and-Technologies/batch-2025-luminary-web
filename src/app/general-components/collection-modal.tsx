import styles from './styles/collection-modal.module.css'
export default function CollectionModal(){
    return(
        <>
            <div className={styles["modal-container"]}>
                <header>
                    <button>
                        <img src="cross.svg" alt="" />
                    </button>
                    <h2>
                        Collections
                    </h2>
                    <button>
                        <img src="plus.svg" alt="" />
                    </button>
                </header>
                <main>
                    
                
                <input type="text" />
                </main>
            </div>
        </>
    )
}