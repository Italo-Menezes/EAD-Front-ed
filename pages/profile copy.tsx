import { Footer } from "@/src/components/common/footer";
import { HeaderAuth } from "@/src/components/common/headerAuth";
import { UserForm } from "@/src/components/Profile/user";
import Head from "next/head";
import { Button, Col, Container, Row } from "reactstrap";
import styles from "../styles/profile.module.scss";
import { useEffect, useState } from "react";
import { Password } from "@/src/components/Profile/password";
import { useRouter } from "next/router";
import PageSpinner from "@/src/components/common/spiner";

const UserInfo = () => {
  const [form, setForm] = useState("userForm");
  const [loading, setLoading] = useState(true);


  const router = useRouter();

  useEffect(() => {
    if(!sessionStorage.getItem('onebitflix-token')){
      router.push('/login')
    }else {
      setLoading(false)
    }
  }, []);

  if(loading) {
    return <PageSpinner/>
  }

  return (
    <>
      <Head>
        <title>OneBitflix - Perfil</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <main>
        <div className="bg-black">
          <HeaderAuth />
        </div>

        <Container className="py-5">
          <p className={styles.title}> Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColor}>
              <Button
                style={{
                  color: form === "userForm" ? "#FF0044" : "white",
                  boxShadow:
                    form === "userForm"
                      ? "0px 0px 10px rgba(156, 155, 155, 0.973)"
                      : "none",
                }}
                className={styles.renderForm}
                onClick={() => {
                  setForm("userForm");
                }}
              >
                Dados Pessoais
              </Button>
              <Button
                style={{
                  color: form === "passwordForm" ? "#FF0044" : "white",
                  boxShadow:
                    form === "passwordForm"
                      ? "0px 0px 10px rgba(156, 155, 155, 0.973)"
                      : "none",
                }}
                className={styles.renderForm}
                onClick={() => {
                  setForm("passwordForm");
                }}
              >
                Senha
              </Button>
            </Col>

            <Col md>{form === "userForm" ? <UserForm /> : <Password />}</Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default UserInfo;
