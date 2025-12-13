"use client"
import styles from './styles/publish-book.module.css'
import { useState } from "react"
import { ProfileModalMode } from '../user-profile-page/page';
import { createClient } from '../../../utils/supabase/client';
interface PublishBookProps{
    userID : string,
    full_name : string,
    setModalMode : (modalMode : ProfileModalMode)=>void,
}

export default function PublishBook({userID, full_name, setModalMode} : PublishBookProps){
    const supabase = createClient();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [genre, setGenre] = useState("Fantasy");

    function updateTitle(e : React.ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value);
    }

    function updateGenre(e : React.ChangeEvent<HTMLSelectElement>){
        setGenre(e.target.value);
    }

    function updateSummary(e : React.ChangeEvent<HTMLTextAreaElement>){
        setSummary(e.currentTarget.value);
    }

    function handleCoverChange(e : React.ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            setCoverFile(e.target.files[0]);
        }
    }

    function handlePdfChange(e : React.ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            setPdfFile(e.target.files[0]);
        }
    }



    const uploadPdf = async (pdfFile : File) => {

        const filePath = `${pdfFile?.name}-${Date.now()}`
        console.log(pdfFile);
        const {error} = await supabase.storage.from("Books").upload(filePath, pdfFile);

        if(error){
            alert("Error uploading file!");
            return "";
        }
        console.log("PDF Successfully added to bucket!");
        const {data : {publicUrl}} = await supabase.storage.from("Books").getPublicUrl(filePath);
        return publicUrl;
    }

    const uploadImage = async (coverFile : File) => {
        const filePath = `${coverFile?.name}-${Date.now()}`
        const {error} = await supabase.storage.from("BookCovers").upload(filePath, coverFile);
        console.log(coverFile);
        if(error){
            alert("Error uploading PDF Cover!");
            return "";
        }
        console.log("Image successfully added to bucket!");
        const { data : {publicUrl} } = await supabase.storage.from("BookCovers").getPublicUrl(filePath);
        return publicUrl;
    }

    async function publishBook(){
        // Validation
        if(!title || !genre || !summary || !coverFile || !pdfFile){
            alert("Please fill in all fields!");
            return;
        }



        let pdfUrl = "";
        if(pdfFile){
            pdfUrl = await uploadPdf(pdfFile);
        } 
        let imageUrl = "";
        if(coverFile){
            imageUrl = await uploadImage(coverFile);
        }

        const {error} = await supabase.from("pending-books").insert(
            [{
                book_title : title,
                author : full_name,
                genre : genre,
                description : summary,
                image_url : imageUrl,
                pdf_url : pdfUrl,
                writerid  : userID,
            }]
        )
        if(error){
            alert("Failed to upload book!");
        }
        else{
            alert("Book is now pending for publication!");
        }
        
        // Reset form
        setTitle("");
        setGenre("");
        setSummary("");
        setCoverFile(null);
        setPdfFile(null);
        
        setModalMode(ProfileModalMode.Off);
    }
    
    return(
        <>
            <div className={styles['modal-container']}>
                 <header>
                    <button onClick={()=>{setModalMode(ProfileModalMode.Off)}}>
                        <img src="/cross.svg" alt="" />
                    </button>
                    <h2>
                        Publish Book
                    </h2>
                    <button onClick={publishBook}>
                        <img src="/check.svg" alt="" />
                    </button>
                </header>

                <main>
                    <div className={styles['form-container']}>
                        <div className={styles['field']}>
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                id="title"
                                onChange={updateTitle} 
                                value={title}
                                placeholder="Book Title"
                                name="title" 
                            />
                        </div>

                        <div className={styles['field']}>
                            <label htmlFor="genre">Genre</label>
                            {/* <input 
                                type="text" 
                                id="genre"
                                onChange={updateGenre} 
                                value={genre}
                                placeholder="Book Genre"
                                name="genre" 
                            /> */}
                            <select value={genre} name="genre" id="genre" onChange={updateGenre}>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Romance">Romance</option>
                            </select>
                        </div>

                        <div className={styles['field']}>
                            <label htmlFor="summary">Summary</label>
                            <textarea 
                                id="summary"
                                onChange={updateSummary} 
                                value={summary}
                                placeholder="Book Summary"
                                name="summary"
                                rows={4}
                            />
                        </div>

                        <div className={styles['field']}>
                            <label htmlFor="cover">Cover Image</label>
                            <input 
                                type="file" 
                                id="cover"
                                accept="image/*"
                                onChange={handleCoverChange}
                                name="cover" 
                            />
                            {coverFile && <p className={styles['filename']}>{coverFile.name}</p>}
                        </div>

                        <div className={styles['field']}>
                            <label htmlFor="pdf">Book PDF</label>
                            <input 
                                type="file" 
                                id="pdf"
                                accept="application/pdf"
                                onChange={handlePdfChange}
                                name="pdf" 
                            />
                            {pdfFile && <p className={styles['filename']}>{pdfFile.name}</p>}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
