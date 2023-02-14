import { Button, Form, FormGroup, Input, Label, Toast } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { ProfileService } from "@/src/services/profileService";
import { Tosat } from "../../common/toast";
import { FormEvent } from "react";
import Router from "next/router";

export const UserForm = () => {
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [erroMessage, setErroMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const date = new Date(createdAt);

  const mount = date.toLocaleDateString("default", { month: "long" });

  useEffect(() => {
    ProfileService.fetchProfile().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      setEmail(user.email);
      setCreatedAt(user.createdAt);
    });
  }, []);

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await ProfileService.userUpadate({
      firstName,
      lastName,
      phone,
      email,
      createdAt,
    });

    if (res === 200) {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      sessionStorage.clear();
      Router.push("/login?put=true");
    } else {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setErroMessage("voce não pode atualizar os dados");
      setColor("bg-danger");
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleUserUpdate}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>
            {firstName.slice(0, 1)}
            {lastName.slice(0, 1)}
          </p>
          <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>

        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="iconProfile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Menbro desde <br />{" "}
            {`${date.getDate()} de ${mount} de ${date.getFullYear()}`}
          </p>
        </div>

        <hr />

        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label for="firstName" className={styles.label}>
              Nome
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              required
              placeholder="Qual o seu Primeiro Nome"
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="lastName" className={styles.label}>
              Sobrenome
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              required
              placeholder="Qual o seu Sobrenome "
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </FormGroup>
        </div>

        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WhatsApp | Telegram{" "}
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              required
              placeholder="(XX) 9XXXX-XXXX"
              className={styles.input}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              E-mail{" "}
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              required
              placeholder="Digite seu email"
              className={styles.input}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </FormGroup>

          <Button className={styles.formBtn} outline type="submit">
            Salvar Alterações
          </Button>
        </div>
      </Form>
      <Tosat color={color} isOpen={toastIsOpen} message={erroMessage} />
    </>
  );
};
