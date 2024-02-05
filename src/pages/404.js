import styles from "../styles/NotFound.module.css";
import Link from "next/link";

export default function notFound() {
  return (
    <>
      <div className={styles.mainDiv}>
        <h1>Ops, parece que algo deu errado!</h1>
        <p>
          Mas tudo bem, você pode clicar no link abaixo para voltar para a home.
        </p>
        <Link href="/" legacyBehavior className={styles.notFoundLink}>
          <a>
            <div className={styles.notFoundButton}>
                <p>Voltar para HomePage.</p>    
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}
