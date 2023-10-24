import styles from '../styles/Card.module.css'
import Link from 'next/link'
import Loading from './Loading'

export default function Card({movie}) {
    return (
        <>
        {movie ? (
            <div className={styles.card}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster"/>
            <div className={styles.card_info}>
                
                <Link href={`/movieDetails/${movie.id}`} legacyBehavior>
                    <a>
                        <h3>
                            {movie.title}
                        </h3>
                    </a>    
                </Link>
                <p>Note: {movie.vote_average}</p>
                
            </div>
        </div>
        ): (
            <Loading/>
        )}
        </>
        
    )
}