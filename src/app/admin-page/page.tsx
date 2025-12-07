"use client";

import React, { useState } from 'react';
import styles from './styles/admin-page.module.css';
import { createClient } from '../../../utils/supabase/client';


export default function AdminPage() {
    const supabase = createClient();
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [genre, setGenre] = useState('');
	const [description, setDescription] = useState('');
	const [coverFile, setCoverFile] = useState<File | null>(null);
	const [pdfFile, setPdfFile] = useState<File | null>(null);

	const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) setCoverFile(e.target.files[0]);
	};

	const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) setPdfFile(e.target.files[0]);
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
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
		// eslint-disable-next-line no-console
	};

	return (
		<>
			<header className={styles.header}>LUMINARY — Admin</header>
			<main className={styles.container}>
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
						<textarea id="description" className={styles.textarea} value={description} onChange={e => setDescription(e.target.value)} rows={6} required />
					</div>

					<div className={styles.field}>
						<label className={styles.label} htmlFor="cover">Cover Image</label>
						<input id="cover" type="file" accept="image/*" onChange={handleCoverChange} className={styles.fileInput} />
						{coverFile ? <p className={styles.filename}>{coverFile.name}</p> : null}
					</div>

					<div className={styles.field}>
						<label className={styles.label} htmlFor="pdf">Book PDF</label>
						<input id="pdf" type="file" accept="application/pdf" onChange={handlePdfChange} className={styles.fileInput} />
						{pdfFile ? <p className={styles.filename}>{pdfFile.name}</p> : null}
					</div>

					<div className={styles.actions}>
						<button type="submit" className={styles.submit}>Create Book</button>
					</div>
				</form>
			</main>
		</>
	);
}

