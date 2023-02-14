import { Footer } from "@/src/components/common/footer";
import { HeaderGeneric } from "@/src/components/common/headerGeneric";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../styles/resgisterLogin.module.scss";
import { useState } from "react";

import { useEffect } from "react";
import { Tosat } from "@/src/components/common/toast";
import { FormEvent } from "react";
import { authService } from "@/src/services/authService";

const Login = () => {
  const router = useRouter();
  const [Toasmessage, setToasmessage] = useState("");
  const [ToasrColor, setToasrColor] = useState("");
  const [ToastIsopen, setToastIsOpen] = useState(false);

  useEffect(() => {
    const registerSuccess = router.query.resgisted;

    if (registerSuccess == "true") {
      setToasrColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToasmessage("Cadastro realizado com sucesso!");
    }

    const put = router.query.put;
    if (put == "true") {
      setToasrColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToasmessage("Autalizado e  fassa o login novamente!");
    }
  }, [router.query]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = {
      email,
      password,
    };

    const { status } = await authService.login(params);

    if (status == 200) {
      router.push("/home?login=true");
    } else {
      setToasrColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToasmessage("Email ou Senha incorretas!");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);
  return (
    <>
      <Head>
        <title>OneBitFlix - Login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/register"
          BtnContent="Querro fazer parte !"
        />

        <Container className="py-5">
          <p className={styles.formTitle}>Bem vindo(a) de volta!</p>

          <Form className={styles.form} onSubmit={handleLogin}>
            <p className="text-center">Bem vindo(a) ao OneBitFlix! </p>

            <FormGroup>
              <Label for="email" className={styles.label}>
                E-email
              </Label>

              <Input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Qual o seu email?"
                className={styles.input}
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label for="password" className={styles.label}>
                Senha
              </Label>

              <Input
                id="password"
                type="password"
                name="password"
                required
                placeholder="Qual a sua senha?"
                className={styles.input}
              ></Input>
            </FormGroup>

            <Button outline className={styles.formBtn} type={"submit"}>
              ENTRAR
            </Button>
          </Form>
          <Tosat
            color={ToasrColor}
            isOpen={ToastIsopen}
            message={Toasmessage}
          />
        </Container>
        <div className="bg-black">
        <Footer/>
        </div>
      </main>
    </>
  );
};

export default Login;
