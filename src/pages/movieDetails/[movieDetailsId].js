
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/MovieDetails.module.css'
import Loading from '../../components/Loading'
import React from 'react'


export default function MovieDetails() {

    const router = useRouter()    

    const api_key= process.env.NEXT_PUBLIC_API_KEY
    const movie_url = process.env.NEXT_PUBLIC_MOVIE_URL
    const [date, setDate] = useState()
    const [budget, setBudget] = useState()
    const [revenue, setRevenue] = useState()
    
    const [movie, setMovie] = useState() // 

    async function getMovie(url) {
        const res = await fetch(url)
        const movieDetails = await res.json()
        if (movieDetails) {
            setMovie(movieDetails)
            formatDate(movieDetails.release_date)
            formatMonetaryValue(movieDetails.budget, movieDetails.revenue)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            const { movieDetailsId } = router.query
            const url = `${movie_url}${movieDetailsId}?${api_key}`
            getMovie(url)
        }
        
    }, [router.query.movieDetailsId]); // Dependência deve ser o ID da URL

  function formatMonetaryValue (budget, revenue) {
    if (budget) {
        const formattedBudget = budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        setBudget(formattedBudget)
    }
    if (revenue) {
        const formattedRevenue = revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        setRevenue(formattedRevenue)
    }    
  }

  function formatDate (date) {
    const releaseDate = new Date(date);
    const formattedReleaseDate = releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    setDate(formattedReleaseDate)
  }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.movie}>
                {movie ? (
                    <>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster"/>
                        <h1>{movie.title}</h1>
                        <h2>{movie.tagline}</h2>
                        <p className={styles.overview}><span>Overview:</span> {movie.overview}</p>
                        <p><span>Note:</span> {movie.vote_average.toFixed(1)}</p>
                        <p><span>Release date:</span> {date}</p>
                        <p><span>Budget:</span> {budget}</p>
                        <p><span>Revenue:</span> {revenue}</p>
                        <p><span>Original title:</span> {movie.original_title}</p>
                        <p>
                            <span>Genres:</span>
                                {movie.genres.map((genre, index) => (
                                    <React.Fragment> 
                                    {index > 0 && <span> / </span>}
                                    <span className={styles.genre}> {genre.name}</span>
                                    </React.Fragment>
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
