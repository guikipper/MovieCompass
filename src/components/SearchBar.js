import styles from '../styles/SearchBar.module.css'
import style from '../styles/SearchResults.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { useState } from 'react'
import React, { useRef } from 'react';

export default function searchBar({placeholder, setResults, input, setInput, setClearResults, setSelectedItemIndex}) {
    const router = useRouter();
    const inputRef = useRef(null);
    const [arrowKeys, setArrowKeys] = useState(false)
    const [arrowKeyPressed, setArrowKeyPressed] = useState(false)

    const getMovieSearch = async (value) => {
        const api_key = process.env.NEXT_PUBLIC_API_KEY;
        const search_url = "https://api.themoviedb.org/3/search/movie";
        const url = `${search_url}?query=${value}&${api_key}`;
        const res = await fetch(url);
        const data = await res.json();

        const filteredResults = data.results.filter((item) => (
            value && item && item.title && item.title.toLowerCase().includes(value)
        ));

        setResults(filteredResults);
        return filteredResults;
    }

    const handleKeyUp = async (e) => {
        setArrowKeyPressed(false)
    }

    const handleKeyDown = async (e) => {
        const value = e.target.value;

        if (e.key === 'Enter') {
            setResults([])
            setTimeout(()=>{
                setResults([])
            },200)
            setClearResults(true);
            if (value) {
                if(arrowKeys == true) {
                    const selectedElement = document.querySelector(`.${style.selected}`); //getting id from item of the list
                    setArrowKeys(false)
                    setInput('')
                    setResults([])
                    setClearResults(true)
                    setSelectedItemIndex(null)
                    router.push(`/movieDetails/${selectedElement.id}`)
                } else {
                    setInput('')
                    setResults([])
                    setClearResults(true)
                    setSelectedItemIndex(null)
                    router.push(`/search/${value}`)
                }
            }  
        }

        if (e.key === 'ArrowUp' && arrowKeyPressed == false || e.key === 'ArrowDown' && arrowKeyPressed == false) {
            setArrowKeyPressed(true)
            setArrowKeys(true) //used to manipuled the enter button behavior
            
            const filteredResults = await getMovieSearch(value);
            const arraySize = filteredResults.length - 1

            var resultsContainer = document.getElementById('searchResults');

            if (arraySize > 0) {
                setSelectedItemIndex((prevIndice) => {
                    if (e.key === 'ArrowUp') {
                        if (prevIndice === null || prevIndice === 0) {
                            resultsContainer.scrollBy(0, 150) //No inicio o prevIndice é null, e quando se vem subindo chega a 0
                            return filteredResults.length - 1 //nesse caso queremos ir pro ultimo item da fila
                        } 
                        resultsContainer.scrollBy(0, -8)
                        return Math.min(prevIndice - 1, arraySize); //Se o indice ficar menor que 0, vai pro final do array
                    } else {
                        if (prevIndice === null || prevIndice == arraySize) {
                            resultsContainer.scrollTop = 0;
                            return 0
                        } 
                        resultsContainer.scrollBy(0, 8)
                        return Math.min(prevIndice + 1, arraySize);
                    }
                });
            }  

        }
    }

    const handleChange = (value) => {
        if (!value) {
            setSelectedItemIndex(null)
        }
        getMovieSearch(value)
    }

    const handleClick = () => {
        const value = inputRef.current.value;
        if (value) {
            router.push(`/search/${value}`);
            setInput('');
            setResults([])
            setClearResults(true);
        }
    }

    return (
        <div className={styles.search}>
            <div className={styles.searchInput}>
                    <input type="text" 
                    autocomplete="off"
                    placeholder={placeholder}
                    id="searchBarInput"
                    value={input} 
                    onChange={(e)=> handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    ref={inputRef}
                    />
                <div className={styles.searchIcon}>
                    <SearchIcon onClick={handleClick}></SearchIcon>
                </div>
            </div>
        </div>
    )
}
