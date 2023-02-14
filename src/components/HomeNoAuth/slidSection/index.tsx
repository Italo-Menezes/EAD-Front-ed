import styles from "./style.module.scss";
import { Button, Container } from "reactstrap";
import { CouseType } from "../../../services/courseService";
import { SlideComponent } from "../../common/slideComponent";
import Link from "next/link";

interface Props {
  newestCourse: CouseType[];
}

export const SlideSection = ({ newestCourse }: Props) => {
  return (
    <>
      <Container className="d-flex flex-column align-items-center py-5">
        <p className={styles.sectionTitle}>AULAS JÁ DISPONIVEIS</p>
        <SlideComponent course={newestCourse} />
        <Link href="/register">
          <Button outline color="light" className={styles.slideSectionBtn}>
            Se Cadastre Para Acessar!
          </Button>
        </Link>
      </Container>
    </>
  );
};
