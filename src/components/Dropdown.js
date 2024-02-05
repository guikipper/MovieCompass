import { useState, useEffect } from 'react'
import styles from '../styles/Dropdown.module.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Dropdown({setGenreFilter}) {
    
    const [isOpen, setIsOpen] = useState(false);

    const genres = [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 10770, name: "TV Movie" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ]

    function toggleDropdown() {
      setIsOpen(!isOpen);
    }


    function selectGenre(genre) {
      toggleDropdown()
      setGenreFilter(genre.id+genre.id)
    }

    return (
        
        <>
        <div className={styles.dropdown}>
            <button onClick={toggleDropdown}>
              <ArrowDropDownIcon/>
            </button>
        </div>
        {isOpen && (
        <ul className={styles.dropdown_list}>
          {genres.map((genre, index) => (
            <li key={index} className={styles.dropdown_item} 
            onClick={() => 
            selectGenre(genre)}>
              {genre.name}
            </li>
          ))}
        </ul>
      )}
        </>        
    )

}
