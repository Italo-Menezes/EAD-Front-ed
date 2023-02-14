import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/Profile.module.scss";
import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { ProfileService } from "@/src/services/profileService";
import { Tosat } from "../../common/toast";

export const Password = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [erroMessage, setErroMessage] = useState("");

  useEffect(() => {
    ProfileService.fetchProfile().then((password) => {
      setCurrentPassword(password.currentPassword);
      setNewPassword(password.newPassword);
    });
  }, []);

  const handlePassowordUpudate = async function (
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setToastIsOpen(true);
      setErroMessage("As senhas não conferem");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      return;
    }

    if (currentPassword === newPassword) {
      setToastIsOpen(true);
      setErroMessage("A senha atual não pode ser igual a nova senha");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      return;
    }

    const res = await ProfileService.passwordUpdate({
      currentPassword,
      newPassword,
    });

    if (res === 200) {
      setToastIsOpen(true);
      setErroMessage("Senha atualizada com sucesso!");
      setColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }

    if (res === 400) {
      setToastIsOpen(true);
      setErroMessage("Senha atual incorreta");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handlePassowordUpudate}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="currentPassword">
              Senha Atual
            </Label>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder="********"
              required
              minLength={6}
              maxLength={20}
              value={currentPassword}
              className={styles.input}
              onChange={(event) => {
                setCurrentPassword(event.currentTarget.value);
              }}
            />
          </FormGroup>
        </div>

        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="NewPassword">
              Nova Senha
            </Label>
            <Input
              type="password"
              id="NewPassword"
              name="  NewPassword"
              placeholder="********"
              required
              minLength={6}
              maxLength={20}
              className={styles.inputFlex}
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.currentTarget.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="confirmNewPassword">
              Confirmar Nova Senha
            </Label>
            <Input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="********"
              required
              minLength={6}
              maxLength={20}
              className={styles.inputFlex}
              value={confirmNewPassword}
              onChange={(event) => {
                setConfirmNewPassword(event.currentTarget.value);
              }}
            />
          </FormGroup>
        </div>
        <Container className="d-flex justify-content-center align-items-center pt-5">
          <Button className={styles.formBtn} outline type="submit">
            Salvar Alterações
          </Button>
        </Container>
      </Form>
      <Tosat color={color} isOpen={toastIsOpen} message={erroMessage} />
    </>
  );
};
