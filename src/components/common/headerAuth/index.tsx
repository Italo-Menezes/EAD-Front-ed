import Link from "next/link";
import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProfileService } from "@/src/services/profileService";
import { FormEvent } from "react";

Modal.setAppElement("#__next");

export const HeaderAuth = () => {
  const router = useRouter();
  const [modalIsOpen, setModalOpen] = useState(false);
  const [initialState, setInitialState] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    ProfileService.fetchProfile().then((user) => {
      const firstNameInitial = user.firstName.slice(0, 1);
      const lastNameInitial = user.lastName.slice(0, 1);
      setInitialState(firstNameInitial + lastNameInitial);
    });
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/?logout=true");
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?name=${searchName}`);
  };

  const handleSearchName = () => {
    router.push(`/search?name=${searchName}`);
  }

  return (
   
      <Container className={styles.nav}>
        <Link href="/home">
          <img
            src="/logoOnebitflix.svg"
            alt="logo"
            className={styles.imgLogoNav}
          />
        </Link>

        <div className="d-flex align-items-center ">
          <Form onSubmit={handleSearch}>
            <Input
              name="search"
              type="search"
              placeholder="Pesquisar"
              className={styles.input}
              value={searchName}
              onChange={(e) =>
                setSearchName(e.currentTarget.value.toLowerCase())
              }
            />
          </Form>
          <img
            src="/homeAuth/iconSearch.svg"
            alt="lupa"
            className={styles.searchImg}
            onClick={handleSearchName}
          />
          <p className={styles.userProfile} onClick={handleOpenModal}>
            {initialState}
          </p>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          shouldCloseOnEsc={true}
          className={styles.modal}
          overlayClassName={styles.overlayModal}
        >
          <Link href="profile" className="text-decoration-none">
            <p className={styles.modalLink}>Meus Dados</p>
          </Link>
          <p className={styles.modalLink} onClick={handleLogout}>
            Sair
          </p>
        </Modal>
      </Container>
 
  );
};
