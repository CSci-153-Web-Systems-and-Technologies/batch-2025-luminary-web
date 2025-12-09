"use client";

import styles from './styles/options.module.css'
import { useState } from 'react';
enum Mode{
    Bookmark, 
    Notes
}
import { ModalMode } from '../book-doc-page/page';

interface OptionProps{
    setMode : (modalMode : ModalMode)=>void, 
    setPageNumber : (page : number) =>void,
    notesData : any,
    bookmarks : any,
}
export default function Options({setMode, setPageNumber, notesData, bookmarks} : OptionProps){
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
    const [optionMode, setOptionMode] = useState(Mode.Bookmark);
    return(
        <>
            <div className={styles["modal-container"]}>
                <div className={styles['close']}>
                    <button onClick={()=>{setMode(ModalMode.Off)}}>
                    <img src="/cross.svg" alt="" />
                    </button>
                </div>
                <header>
                    
                    <button onClick={()=>{setOptionMode(Mode.Bookmark)}}>
                        <span style={optionMode === Mode.Bookmark ? 
                        {
                            borderBottom : "2px solid #92A4B5"
                        }
                    :   {}
                    }>
                            Bookmarks
                        </span>
                    </button>
                    <button onClick={()=>{setOptionMode(Mode.Notes)}}>
                        <span style={optionMode === Mode.Notes ? 
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
                        {optionMode == Mode.Bookmark ?
                        
                        BookmarkContent.map((value, index)=> 
                            (
                                <li key={index}>
                                    <button style={{
                                        justifyContent : 'space-between',
                                    }}
                                    onClick={()=>{
                                        setPageNumber(value)
                                        setMode(ModalMode.Off)
                                    }}
                                    >
                                        <div>Bookmark  {` ${index + 1}: `}</div> 
                                        
                                        <div>
                                        {value}
                                        </div>
                                    </button>
                                </li>
                            )
                        )

                        :

                        NoteContent.map((value, index)=>
                            (
                                <li key={index}>
                                    <button style={{
                                        flexDirection : "column",
                                    }}
                                    onClick={()=>{
                                        setPageNumber(value[0])
                                        setMode(ModalMode.Off)
                                    }}
                                    >
                                        <div style={{
                                            borderBottom : "2px solid #313B4B",
                                            marginBottom : "10px",
                                        }}>
                                        {value[0]}
                                        </div>
                                        <div>
                                        {value[1]}
                                        </div>
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