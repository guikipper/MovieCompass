import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import SearchBar from './SearchBar'
import { useState } from 'react'
import SearchResults from './SearchResults'
import TheatersIcon from '@mui/icons-material/Theaters';

export default function Navbar() {

    const [results, setResults] = useState([])
    const [input, setInput] = useState(undefined)
    const [clearResults, setClearResults] = useState(false)
    
    if(clearResults) {
        setResults([])
        setClearResults(false)
    }

    return (
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    {/* <p><Image src="/images/cinema.png" width={100} height={120} alt="CineSeeker"/></p> */}
                    <TheatersIcon className={styles.theatherIcon}/>
                    
                    <Link href="/" legacyBehavior>
                        <a>
                            <h1>Movie Compass</h1>
                        </a>
                    </Link>
                </div>
                <div>
                    <div className={styles.searchBar}>
                        <div className={styles.mainSearchInput}>
                            <SearchBar placeholder="Search for a movie..." setResults={setResults} input={input} setInput={setInput} setClearResults={setClearResults}></SearchBar>
                        </div>
                        <SearchResults results={results} setInput={setInput} setClearResults={setClearResults}></SearchResults> 
                    </div>
                    
                    
                </div> 
                
                <ul className={styles.link_items}>
                    <li>
                        <Link href="/" legacyBehavior><a>Home</a></Link>
                    </li>
                    <li>
                        <Link href="/about" legacyBehavior><a>About</a></Link>
                    </li>
                </ul>
            </nav>
    )
}