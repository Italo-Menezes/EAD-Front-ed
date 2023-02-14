import { Toast, ToastBody } from "reactstrap";
interface props {
  isOpen: boolean;
  message: string;
  color: string;
}
import styles from "./styles.module.scss";

export const Tosat = ({ isOpen, message, color }: props) => {
  return (
    <>
      <Toast
        id={styles.toast}
        className={`${color} text-white fixed-top ms-auto mt-3`}
        isOpen={isOpen}
      >
        <ToastBody className="text-center ">{message}</ToastBody>
      </Toast>
    </>
  );
};
