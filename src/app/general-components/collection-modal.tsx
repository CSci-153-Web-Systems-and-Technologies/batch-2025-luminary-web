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
                    <ul>
                        <li className={styles['collections list']}>
                            <p>
                                Childhood Books
                            </p>
                            <button>
                                <img src="add-to-collection-button.svg" alt="add-to" />
                            </button>
                        </li>
                    </ul>
                </main>
            </div>
        </>
    )
}