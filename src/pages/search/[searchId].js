import { useState, useEffect, use } from "react"
import { useRouter } from 'next/router'
import Card from '../../components/Card'
import styles from '../../styles/SearchPage.module.css'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Loading from "../../components/Loading";

export default function Search() {
    const [movies, setMovies] = useState([])
    const router = useRouter()
    const [actualPage, setActualPage] = useState(1)
    const [totalPages, setTotalPages] = useState()

    async function getMovie(url) {
        const res = await fetch(url)
        const data = await res.json()
        if (data) {
            setTotalPages(data.total_pages)
            setMovies(data)
        }
    }

    useEffect(()=>{
        if(router.isReady) {
            const {searchId} = router.query
            const api_key= process.env.NEXT_PUBLIC_API_KEY
            const search_url = "https://api.themoviedb.org/3/search/movie"
            const url = `${search_url}?query=${searchId}&${api_key}&page=${actualPage}`
            console.log(url)
            getMovie(url)
        }
    },[router.query.searchId, actualPage])

    function changePage(page) {
            setActualPage(page)
    }

    console.log('Total Pages: ', totalPages)

    return (
        <div className={styles.main}>
            <div className={styles.mainSearchPage}>
                <div className={styles.searchPageResults}>
                    {movies && movies.results && movies.results.map((movie) => (
                        <Card key={movie.id} movie={movie}></Card>
                    ))}
                </div>
            </div>
            <div className={styles.pagination}>
            
                {actualPage != 1 && 
                (<button 
                disabled={actualPage === 1}
                onClick={()=>{
                    changePage(actualPage-1)
                }}>
                    {actualPage-1}
                </button>)}

                <button style={{'backgroundColor': 'rgb(81, 61, 59)'}} 
                disabled={true}
                onClick={()=>{
                    changePage(actualPage)
                }}>
                    {actualPage}
                </button>

                {totalPages === 1 ? (
                    <>
                    </>
                ): (
                    (actualPage + 1 !== totalPages || totalPages === 1)&& ( 
                        <button onClick={()=>{
                            changePage(actualPage+1)
                        }}>
                            {actualPage+1}
                        </button>
                    )
                )}
                
                
            </div>
        </div>
        
        

    )
}