import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

require("dotenv").config()

export default function Home() {
  
const api_key= process.env.NEXT_PUBLIC_API_KEY
const movie_url = process.env.NEXT_PUBLIC_MOVIE_URL

const api = `${movie_url}top_rated?${api_key}`

  const itensPerPage = 9
  const [actualPage, setActualPage] = useState(0)  
  const [topRated, setTopRated] = useState([])
  const [showBackButton, setShowBackButton] = useState(false)
  const [showForwardButton, setShowForwardButton] = useState(true)

  async function getTopRatedMovies(api) {
    const res = await fetch(api)
    const data = await res.json()
    setTopRated(data.results)
  }

  const totalPages = Math.ceil(topRated.length / itensPerPage)
  const initialItem = actualPage * itensPerPage
  const lastItem = initialItem + itensPerPage
  const itensOfPage = topRated.slice(initialItem, lastItem)

  useEffect(() => {
    if (actualPage > 0) {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }

    if (actualPage + 1 === totalPages) {
      setShowForwardButton(false);
    } else {
      setShowForwardButton(true);
    }
  }, [actualPage, totalPages]);

  // ... (rest of your code)


  useEffect(()=>{
      getTopRatedMovies(api)
  },[])

  return (
    <div className={styles.mainContent}>

      {showBackButton && (
        <div className={styles.back}>
          <p onClick={()=>{
            setActualPage(actualPage-1)
          }}>
            <ArrowBackIosOutlinedIcon className={styles.backIcon}/>
          </p>
        </div>
      )}
      

      <div className={styles.main_background}>  
        { <div className={styles.cards_container}>
          {itensOfPage.map((movie)=>(
            <>
              <Card key={movie.id} movie={movie}></Card>
            </>
          ))}
        </div> }
      </div>
      
      {showForwardButton && (
        <div className={styles.forward}>
          <p onClick={()=>{
            setActualPage(actualPage+1)
          }}>
            <ArrowForwardIosOutlinedIcon className={styles.forwardIcon}/>
          </p>
      </div>
      )}
      

    </div>

    
  )
}

