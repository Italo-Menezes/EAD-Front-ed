import Link from "next/link";
import { Container, Button } from "reactstrap";
import styles from "./styles.module.scss";

export const HeaderNoAuth = function () {
  return (
    <>
      <div className={styles.ctaSection}>
        <img
          src="/homeNoAuth/logocta.png"
          alt="logocta"
          className={styles.imgCta}
        />
        <p>Se cadastre para ter acesso as cursos </p>
        <img
          src="/homeNoAuth/logocta.png"
          alt="logocta"
          className={styles.imgCta}
        />
      </div>

      <Container className={styles.nav}>
        <img src="/logoOnebitflix.svg" alt="logoOnebitflix"  className={styles.imgLogoNav}/>
        <div>
          <Link href="login"><Button className={styles.navBtn} outline>Entrar</Button></Link>
          <Link href="/register"><Button className={styles.navBtn} outline>Quero fazer Parte</Button></Link>
        
        </div>
      </Container>
    </>
  );
};
