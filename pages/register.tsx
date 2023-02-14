import styles from "../styles/resgisterLogin.module.scss";
import Head from "next/head";
import { HeaderGeneric } from "@/src/components/common/headerGeneric";
import { Form, FormGroup, Label, Container, Button, Input } from "reactstrap";
import { Footer } from "@/src/components/common/footer";
import { FormEvent } from "react";
import { authService } from "@/src/services/authService";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { Tosat } from "@/src/components/common/toast";

import { useEffect } from "react";




const Register = () => {

  const router = useRouter();

useEffect(() => {
  if(sessionStorage.getItem("onebitflix-token")) {
    router.push('/home');
  }
}, [])
 
 
 
  const [ToastIsopen, setToastIsOpen] = useState(false);
  const [Toasmessage, setToasmessage] = useState("");
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDate = new FormData(event.currentTarget);
    const firstName = formDate.get("firstName")!.toString();
    const lastName = formDate.get("lastName")!.toString();
    const phone = formDate.get("phone")!.toString();
    const email = formDate.get("email")!.toString();
    const birth = formDate.get("birth")!.toString();
    const password = formDate.get("password")!.toString();
    const passwordConfirmation = formDate
      .get("passwordConfirmation")!
      .toString();
    const params = {
      firstName,
      lastName,
      phone,
      email,
      birth,
      password,
    };

    if (password != passwordConfirmation) {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);

      setToasmessage("As senhas não conferem");
      return;
    }

    const { data, status } = await authService.resgiter(params);

    if (status == 201) {
      router.push("/login?resgisted=true");
    } else {
      setToasmessage(data.message);
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 5);
    }
  };

  

  return (
    <>
      <Head>
        <title>OneBitFlix - Registro </title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <script src="https://jsuites.net/v4/jsuites.js" defer></script>
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/login"
          BtnContent="Querro Fazer Login"
        />

        <Container className="py-5 ">
          <p className="">
            <strong className={styles.formTitle}>
              Bem-vindo(a) ao OneBitFlix!
            </strong>
          </p>

          <Form className={styles.form} onSubmit={handleRegister}>
            <p className="text-center">
              <strong>Faça a sua conta </strong>
            </p>

            <FormGroup>
              <Label for="firstName" className={styles.label}>
                Nome
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Qual o seu nome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>

            <FormGroup>
              <Label for="lastName" className={styles.label}>
                Sobrenome
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Qual o seu sobrenome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>

            <FormGroup>
              <Label for="phone" className={styles.label}>
                WhatsApp / Telegram
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(XX) 9xxxx-xxxx"
                data-mask="[-]+55 (00) 00000-0000"
                required
                className={styles.input}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email" className={styles.label}>
                E - mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite o seu e-mail!"
                required
                className={styles.input}
              />
            </FormGroup>

            <FormGroup>
              <Label for="birth" className={styles.label}>
                Data de nacimento
              </Label>
              <Input
                id="birth"
                name="birth"
                type="date"
                required
                min="1930-01-01"
                /* data atual no padrão americano  */
                max={new Date().toISOString().split("T")[0]}
                className={styles.input}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password" className={styles.label}>
                Senha
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite a sua senha (Min:6 Max:20)"
                minLength={6}
                maxLength={20}
                required
                className={styles.input}
              />
            </FormGroup>

            <FormGroup>
              <Label for="passwordConfirmation" className={styles.label}>
                Confirme a senha
              </Label>
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Confirme a sua senha"
                minLength={6}
                maxLength={20}
                required
                className={styles.input}
              />
            </FormGroup>

            <Button type="submit" outline className={styles.formBtn}>
              CADASTRA
            </Button>
          </Form>
        </Container>
        <Footer />
        <Tosat color="bg-danger" isOpen={ToastIsopen} message={Toasmessage} />
      </main>
    </>
  );
};

export default Register;
