import styles from '../styles/SearchResults.module.css'
import Link from 'next/link'

import { useRouter } from 'next/router'

export default function SearchResults({results, setInput, setClearResults}) {
    //const router = useRouter() 

    function handleClick() {
        setInput('')
        setClearResults(true)
    }
    try {
        setInput(undefined)
    } catch (error) {
        console.log('Erro: ', error)
    }
    
    return (
        <div className={styles.searchResults}>

                {results.map((item)=>(
                    <div id="idTeste" className={styles.itemResults}>
                        <Link href={`/movieDetails/${item.id}`} legacyBehavior>
                            <a onClick={handleClick}>
                                <p key={item.id} className={styles.pResult}> 
                                    {item.title}
                                </p>
                            </a>
                        </Link>
                    </div>
                ))}


        </div> 
    )
}