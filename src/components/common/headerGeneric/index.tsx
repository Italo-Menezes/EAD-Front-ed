import Link from "next/link";
import { Button, Container } from "reactstrap";
import styles from "./styles.module.scss";

interface Props {
  logoUrl: string;
  btnUrl: string;
  BtnContent: string;
}

export const HeaderGeneric = ({ logoUrl,btnUrl,BtnContent}: Props) => {
  return (
    <>
      <div className={styles.header} >
        <Container className={styles.headerContainer}>
        <Link href={logoUrl}>
          <img src="/logoOneBitflix.svg" alt="logo" className={styles.headerLogo}/>
          </Link>
        <Link href={btnUrl}> 
          <Button outline color="light" className={styles.headerBtn}>{BtnContent}</Button>
        </Link>
         </Container>
      </div>
    </>
  );
};
