import styles from "./styles.module.scss";
import { Container, Row, Col, Button } from "reactstrap";
import Link from "next/link";

export function PresentationSection() {
  return (
    <>
      <Container className="py-4">
        <Row>
          <Col md className="d-flex flex-column justify-content-center align-itens-start ">
            <p className={styles.subTitle}>ACESSO ILIMITADO</p>
            <p className={styles.Title}>
              Tenha acesso aos melhores <br />  tuturoais de
              Progamação.
            </p>
            <p className={styles.description}>
              Estude de onde estiver, a qualque momento, e continue <br />{" "}
              evoluindo como progamador.
            </p>
            <Link className={styles.Link} href="/register">
              <Button className={styles.btncta} outline>
                ACESSE AGORA
                <img
                  src="/buttonPlay.svg"
                  alt="img"
                  className={styles.btnimg}
                />
              </Button>
            </Link>
          </Col>

          <Col md>
            <img
              src="/homeNoAuth/imgPresentation.png"
              className={styles.presentation}
              alt="img"
            />
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center pt-5">
            <img src="/homeNoAuth/iconArrowDown.svg" alt="img" className={styles.arrowDown}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
