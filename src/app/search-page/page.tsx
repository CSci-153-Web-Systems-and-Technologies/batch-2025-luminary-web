"use client"
import styles from './styles/search.module.css'
import resultStyles from './styles/results.module.css'
import BookCard from '../main-page/components/book-card'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '../../../utils/supabase/client'

function useDebounce(value : string, delay : number = 700){
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay);

        return ()=> clearTimeout(timeout)
    }, [value]);
    return debouncedValue;
}


export default function SearchPage(){
    const supabase = createClient();
    const {back} = useRouter();
    const [searchText, setSearchText] = useState("");
    const debouncedSearch = useDebounce(searchText);
    const [bookData, setBookData] = useState<any>(null);

    function changeInputText(e : React.ChangeEvent<HTMLInputElement>){
        setSearchText(e.currentTarget.value);
    }
    useEffect(()=>{
        const fetchData = async()=>{
            const {data, error} = await supabase.from("books").select("*").ilike("book_title", `%${debouncedSearch}%`)
            if(error){
                alert('search failed!');
            }else{
                console.log(data);
            }
            setBookData(!error ? data : null);
        }

        fetchData();
    }, [debouncedSearch]);
    return(
    <>
    <div className={styles['parent-div']}>
        <header className={styles["search-header"]}>
            <button onClick={()=>{back()}}>
                <img src="arrow-left.svg" alt="" />
            </button>
            <h1>
                LUMINARY
            </h1>
            <div className={styles["empty-container"]}>

            </div>
        </header>
        <main className={styles['search-main']}>
            <div className={styles['searchbar']}>
                <input onChange={changeInputText} type="text" placeholder='Search'/>
                <img src="search.svg" alt="" />
            </div>
            <div className={resultStyles['results']}>
                <ul>
                    {debouncedSearch.length > 0 ? bookData.map((value, index)=>{
                        return(
                            <li key={index}>
                                <BookCard imgUrl={value.image_url}
                                bookID={value.id}
                                ></BookCard>
                            </li>
                        )
                    }
                
                )
                :

                null
                    }
                </ul>
            </div>
        </main>
        </div>
    </>)

}