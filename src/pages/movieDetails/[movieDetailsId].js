
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/MovieDetails.module.css'
import Loading from '../../components/Loading'


export default function MovieDetails() {
    const router = useRouter()    

    const api_key= process.env.NEXT_PUBLIC_API_KEY
    const movie_url = process.env.NEXT_PUBLIC_MOVIE_URL
    
    //states
    const [movie, setMovie] = useState()

    async function getMovie(url) {
        const res = await fetch(url)
        const data = await res.json()
        if (data) {
            setMovie(data)
        }
        
    }
    useEffect(() => {
        if (router.isReady) {
            const { movieDetailsId } = router.query
            const url = `${movie_url}${movieDetailsId}?${api_key}`
            getMovie(url)
        }
        
    }, [router.query.movieDetailsId]); // Dependência deve ser o ID da URL

    
    return (
        <div className={styles.mainContainer}>
            <div className={styles.movie}>
                {movie ? (
                    <>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster"/>
                        <h1>{movie.title}</h1>
                        <h2>{movie.tagline}</h2>
                        <p className={styles.overview}><span>Overview:</span> {movie.overview}</p>
                        <p><span>Release date:</span> {movie.release_date}</p>
                        <p><span>Budget:</span> {movie.budget}</p>
                        <p><span>Revenue:</span> {movie.revenue}</p>
                        <p><span>Original title:</span> {movie.original_title}</p>
                        <p>
                            <span>Genres:</span>
                            {movie.genres.map((movie)=>(
                            <p className={styles.genre}> / {movie.name}</p>
                        ))}
                        </p>
                    </>
                ) : (
                    <Loading/>
                )}
        
            </div>
        </div>
        
    )
}
