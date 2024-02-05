import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import SearchBar from './SearchBar'
import { useState } from 'react'
import SearchResults from './SearchResults'
import TheatersIcon from '@mui/icons-material/Theaters';


export default function Navbar() {

    const [results, setResults] = useState([])
    const [input, setInput] = useState('')
    const [clearResults, setClearResults] = useState(false)
    const [selectedItemIndex, setSelectedItemIndex] = useState(null); //item selecionado
    
    if(clearResults) {
        setResults([])
        setClearResults(false)
    }
    const handleLogoClick = () => {
        setResults([]);
        setInput('')
    }

    return (
            <nav className={styles.navbar}>
                <div className={styles.logo} onClick={handleLogoClick}>
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
                            <SearchBar placeholder="Search for a movie..." setResults={setResults} input={input} setInput={setInput} setClearResults={setClearResults} setSelectedItemIndex={setSelectedItemIndex}></SearchBar>
                        </div>
                            <SearchResults className={styles.resultsDiv} results={results} setInput={setInput} input={input} setClearResults={setClearResults} selectedItemIndex={selectedItemIndex}></SearchResults> 

                        
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