import { Container } from 'reactstrap';
import { symbolName } from 'typescript';
import  styles from './styles.module.scss';

export  function Footer() {
  return (
    <>
    <Container className={styles.footer}>
      <img src="/logoOnebitcode.svg" alt="logoFooter"  className={styles.footerLogo}/>
      <a href="http://onebitcode.com" target={"_blank"} className={styles.footerLink}>ONEBITCODE.COM</a>
    </Container>
    </>
  )
}