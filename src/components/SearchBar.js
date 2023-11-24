import styles from '../styles/SearchBar.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { useState } from 'react'
import React, { useRef } from 'react';

export default function searchBar({placeholder, setResults, input, setInput, setClearResults}) {
    const router = useRouter();
    const inputRef = useRef(null);

    const [movieResults, setMovieResults] = useState([])
    const [selectedItem, setSelectedItem] = useState(null); //item selecionado

    async function getMovieSearch(value) {
        const api_key= process.env.NEXT_PUBLIC_API_KEY
        const search_url = "https://api.themoviedb.org/3/search/movie"
        const url = `${search_url}?query=${value}&${api_key}`
        const res = await fetch(url)
        const data = await res.json()
        const filteredResults = data.results.filter((item)=>{
            return(
                value &&
                item &&
                item.title &&
                item.title.toLowerCase().includes(value)
            ) 
        })
        setResults(filteredResults)
        setMovieResults(filteredResults)
       
    }

    const handleKeyDown = (e) => {
        const value = e.target.value;
        if (e.key === 'Enter') {
            router.push(`/search/${value}`)
            setInput('')
            setClearResults(true)
        }
        if (e.key === 'ArrowUp') {

            console.log('Up')
            e.preventDefault();


          } else if (e.key === 'ArrowDown') {
            console.log('Down')
            e.preventDefault();

          }
    }

    const handleChange = (value) => {
        getMovieSearch(value)
    }

    const handleClick = () => {
        const value = inputRef.current.value;
        if (value) {
            router.push(`/search/${value}`);
            setInput('');
            setClearResults(true);
        }
    }

    return (
        <div className={styles.search}>
            <div className={styles.searchInput}>
                <input type="text" 
                placeholder={placeholder}
                value={input} 
                onChange={(e)=> handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                />
                <div className={styles.searchIcon}>
                    <SearchIcon onClick={handleClick}></SearchIcon>
                </div>
            </div>
        </div>
    )
}
