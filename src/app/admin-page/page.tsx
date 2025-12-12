"use client";

import React, { useState, useEffect } from 'react';
import styles from './styles/admin-page.module.css';
import { createClient } from '../../../utils/supabase/client';
import { useRouter } from 'next/navigation';


export default function AdminPage() {
    const supabase = createClient();
    const router = useRouter();
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [genre, setGenre] = useState('');
	const [description, setDescription] = useState('');
	const [coverFile, setCoverFile] = useState<File | null>(null);
	const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [requests, setRequests] = useState<any>(null);
    
    const fetchRequests= async()=>{
            const {data , error} = await supabase.from("pending-books").select("*");
            if(error){
                alert("Error fetching requests!");
            }
            else{
                // alert("Requests fetched successfully!");
            }
            setRequests(!error ? data : null);
    }

    useEffect(()=>{
        fetchRequests();
    }, [])
    
    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) setCoverFile(e.target.files[0]);
	};

	const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) setPdfFile(e.target.files[0]);
	};

    
    const handleAcceptBook  = async (book : any) => {
        // You will handle Supabase update here
        console.log("Accepting book:", book.id);
        
        const {error} = await supabase.from('books').insert([
            {
                id : book.id,
                book_title : book.book_title,
                author : book.author,
                genre : book.genre,
                description : book.description,
                image_url : book.image_url,
                pdf_url : book.pdf_url,
                writerid : book.writerid,
            }
        ]).single();

        if(error){  
            alert("Failed to insert book!");
            return;
        }


        alert("Book accepted!");
        makeWriter(book.writerid);
        deleteBook(book.id);
        
    };
    const makeWriter = async(writerID : string)=>{
        const {error} = await supabase.from('profiles').update({
            isWriter : true,
        }).eq('id', writerID);
        if(error){
            alert("error setting writer to true!");
        }
    }
    const deleteBook = async (bookID: string) => {
        // You will handle Supabase delete here
        console.log("Deleting book:", bookID);
        
        const {error} = await supabase.from("pending-books").delete().eq("id", bookID);
        if(error){
            alert("Failed to reject book!");
            return;
        }
        // alert("Book rejected!");
        fetchRequests();
    };

    const handleViewDetails = (bookID: string) => {
        router.push(`/book-info-page?bookId=${bookID}&ispending=${"true"}`);
    };

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

	const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
		if (e && 'preventDefault' in e) e.preventDefault();
		// You will handle Supabase integration; for now we just expose collected values

        
		

        let pdfUrl = "";
        if(pdfFile){
            pdfUrl = await uploadPdf(pdfFile);
        } 
        let imageUrl = "";
        if(coverFile){
            imageUrl = await uploadImage(coverFile);
        }

        // const uuid = generateUUID();
        
        const {error} = await supabase.from("books").insert(
            [{
                book_title : title,
                author : author,
                genre : genre,
                description : description,
                image_url : imageUrl,
                pdf_url : pdfUrl,
            }]
        )
        if(error){
            alert("Error adding book!");
            return;
        }
        else{
            alert("Added book successfully!");
        }
        setTitle('');
        setAuthor('');
        setGenre('');
        setDescription('');
        setCoverFile(null);
        setPdfFile(null);
		
	};

	return (
		<>
			<div className={styles.pageWrapper}>
				<header className={styles.header}>
					<button onClick={() => router.back()} className={styles.backButton}>
						<img src="/home.svg" alt="back" />
					</button>
					LUMINARY — Admin
				</header>
				<main className={styles.container}>
				<div className={styles.content}>
					<section className={styles.formSection}>
						<form className={styles.form} onSubmit={handleSubmit}>
							<h1 className={styles.heading}>Add New Book</h1>

							<div className={styles.field}>
								<label className={styles.label} htmlFor="title">Title</label>
								<input id="title" className={styles.input} value={title} onChange={e => setTitle(e.target.value)} required />
							</div>

							<div className={styles.field}>
								<label className={styles.label} htmlFor="author">Author</label>
								<input id="author" className={styles.input} value={author} onChange={e => setAuthor(e.target.value)} required />
							</div>

							<div className={styles.field}>
								<label className={styles.label} htmlFor="genre">Genre</label>
								<input id="genre" className={styles.input} value={genre} onChange={e => setGenre(e.target.value)} required />
							</div>

							<div className={styles.field}>
								<label className={styles.label} htmlFor="description">Description</label>
								<textarea id="description" className={styles.textarea} value={description} onChange={e => setDescription(e.target.value)} rows={3} required />
							</div>

							<div className={styles.field}>
								<label className={styles.label} htmlFor="cover">Cover Image</label>
								<input id="cover" type="file" accept="image/*" onChange={handleCoverChange} className={styles.fileInput} />
								
							</div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="pdf">Book PDF</label>
                                <input id="pdf" type="file" accept="application/pdf" onChange={handlePdfChange} className={styles.fileInput} />
                                {/* {pdfFile ? <p className={styles.filename}>{pdfFile.name}</p> : null} */}
                            </div>
						</form>
								<div className={styles.actions}>
									<button type="button" onClick={handleSubmit} className={styles.submit}>Create Book</button>
								</div>
					</section>					
                            <section className={styles.pendingSection}>
						<h2 className={styles.sectionHeading}>Pending Book Requests</h2>
						<div className={styles.requestsList}>
							{requests?.length === 0 ? (
								<p className={styles.emptyMessage}>No pending requests</p>
							) : (
								requests?.map((book) => (
									<div key={book.id} className={styles.requestCard}>
										<div className={styles.requestActions}>
											<button 
												className={styles.rejectBtn}
												onClick={() => deleteBook(book.id)}
												title="Reject"
											>
												<img src="/cross.svg" alt="reject" />
											</button>
											<button 
												className={styles.acceptBtn}
												onClick={() => handleAcceptBook(book)}
												title="Accept"
											>
												<img src="/check.svg" alt="accept" />
											</button>
										</div>
										<button 
											className={styles.requestContent}
											onClick={() => handleViewDetails(book.id)}
										>
											<div className={styles.bookInfo}>
												<h3 className={styles.bookTitle}>{book.book_title}</h3>
												<p className={styles.bookAuthor}>{book.author}</p>
												<p className={styles.bookGenre}>{book.genre}</p>
											</div>
										</button>
									</div>
								))
							)}
						</div>
					</section>
				</div>
			</main>
			</div>
		</>
	);
}

