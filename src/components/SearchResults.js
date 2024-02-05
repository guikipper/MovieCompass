import styles from '../styles/SearchResults.module.css'
import Link from 'next/link'

export default function SearchResults({results, setInput, setClearResults, selectedItemIndex}) {
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
        <div id="searchResults" className={styles.searchResults}>
                {results.map((item, index)=>(
                    <div id="idTeste" className={styles.itemResults}>
                        <Link 
                        href={`/movieDetails/${item.id}`} legacyBehavior>
                            <a onClick={handleClick}>
                           
                            <p
                               key={item.id}
                               id={item.id} 
                               className={`${selectedItemIndex == index ? styles.selected : ''}`}
                            > 
                                    {item.title}
                                </p>
                            </a>
                        </Link>
                    </div>
                ))}


        </div> 
    )
}