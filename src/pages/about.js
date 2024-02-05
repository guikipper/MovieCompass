import styles from '../styles/About.module.css'
import { register } from 'swiper/element/bundle';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link';

register()


export default function About() {

    const images = [
      { id: 1, image: "https://s2.glbimg.com/bGNljVTtWba-Xlm9T0JxmhONKqg=/620x455/e.glbimg.com/og/ed/f/original/2020/06/28/rio-em-meio-as-pedras-170721_joao_machado_e_arasi-87.jpg"} ,
      { id: 2, image: "https://images.ecycle.com.br/wp-content/uploads/2013/10/22181527/andreas-gucklhorn-285567-aspect-ratio-260x156-2.jpg.webp"} 
    ]

    return (
      <>
      <div className={styles.about}>
         
          <div className={styles.aboutText}>
            <h1>Por baixo dos panos:</h1>
            <p>
            Bem-vindo ao Movie Compass! Sou Guilherme Kipper, o desenvolvedor por trás deste projeto. 
            Aqui, você encontra informações sobre filmes de maneira simples e fácil.
            Com uma abordagem descomplicada, o Movie Compass torna a exploração do universo cinematográfico uma experiência intuitiva. 
            Em cada clique, você descobre mais sobre seus filmes favoritos, sem complicação.
            O Movie Compass é um projeto modesto, construído com Next.js, que serve como uma demonstração prática de tecnologia, 
            refletindo meu aprendizado contínuo.
            Me formei em Técnico de Informática pelo IFsul de Venâncio Aires e atualmente estou cursando Análise e Desenvolvimento de Sistemas na Univates. 
            Em busca de desafios e aprendizados, estou agora procurando minha primeira oportunidade como desenvolvedor, ansioso para aplicar minhas habilidades em um ambiente prático.

            </p>
          </div>
          <div className={styles.guitarImage}>
            <Swiper
            buttonWrapperStyle={{backgroundColor: 'black'}}
            slidesPerView={1}
            pagination={{clickable: true}}
            navigation={{clickable: true}}
            >
              {images.map((item)=>(
                <SwiperSlide key={item.id}>
                  <img src={item.image}
                  alt='Guitarra'
                  />
                </SwiperSlide>
              ))}
            </Swiper>            
          </div>
      </div>

      <div className={styles.contact}>
        <p>Veja outros trabalhos:</p>
        <div className={styles.contactIcon}>
          <Link href="https://github.com/guikipper" className={styles.link}>
            <div className={styles.icon}>
              <GitHubIcon/>
            </div>
          </Link>
          
          <Link href="https://www.linkedin.com/in/guilhermekipper/"  className={styles.link}>
            <div className={styles.icon}>
              <LinkedInIcon/>
            </div>
          </Link>

        </div>
          
      </div>
      </>
        
        
    )
}