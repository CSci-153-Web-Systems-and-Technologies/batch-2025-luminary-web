"use client";

import styles from './styles/options.module.css'
import { useState } from 'react';
enum Mode{
    Bookmark, 
    Notes
}


export default function Options(){
    const BookmarkContent : number[] = 
[
    123,
    364,
    400,
]

const NoteContent : [number, string][] = 
[
    [364, "Mudblood is a derogatory term for a witch born to muggleborn parents"],
    [394, "FUCK!"],
]
    const [mode, setMode] = useState(Mode.Bookmark);
    return(
        <>
            <div className={styles["modal-container"]}>
                <header>
                    <button onClick={()=>{setMode(Mode.Bookmark)}}>
                        <span style={mode === Mode.Bookmark ? 
                        {
                            borderBottom : "2px solid #92A4B5"
                        }
                    :   {}
                    }>
                            Bookmarks
                        </span>
                    </button>
                    <button onClick={()=>{setMode(Mode.Notes)}}>
                        <span style={mode === Mode.Notes ? 
                        {
                            borderBottom : "2px solid #92A4B5"
                        }
                    :   {}
                    }>
                            Notes
                        </span>                        
                    </button>
                </header>
                <main>
                    <ul>
                        {mode == Mode.Bookmark ?
                        
                        BookmarkContent.map((value, index)=> 
                            (
                                <li key={index}>
                                    <button>
                                        {value}
                                    </button>
                                </li>
                            )
                        )
                        :

                        NoteContent.map((value, index)=>
                            (
                                <li key={index}>
                                    <button>
                                        {value}
                                    </button>
                                </li>
                            )
                        )
                        }
                    </ul>
                </main>
            </div>
        </>
    )    
}