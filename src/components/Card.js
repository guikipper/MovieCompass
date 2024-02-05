import styles from "../styles/Card.module.css";
import Link from "next/link";
import Loading from "./Loading";
import { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';

export default function Card({ movie }) {
  
  const [isImageError, setIsImageError] = useState(false)

  const handleImageError = () => {
    setIsImageError(true)
  };

  return (
    <>

      {movie ? (
        <div className={styles.card  + (isImageError ? ` ${styles.hideIfError}` : '')}>

            <>
              <div className={styles.card_info}>
                <Link href={`/movieDetails/${movie.id}`} legacyBehavior>
                  <a title={movie.title}>
                  <img
                    onError={handleImageError}
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="poster"
                  />
                    <p>{movie.title}</p>
                  </a>
                </Link>

                  <div className={styles.rating}>
                    <div className={styles.star_icon}>
                      <StarIcon/>
                    </div>
                       
                    <div className={styles.star_p}>
                    <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
                    </div>
                  </div> 
                 
              </div>
            </>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}