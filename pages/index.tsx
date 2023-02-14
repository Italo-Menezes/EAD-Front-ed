import { HeaderNoAuth } from "../src/components/HomeNoAuth/headerNoAuth";
import Head from "next/head";
import styles from "../styles/HomeNotAuth.module.scss";
import { PresentationSection } from "@/src/components/HomeNoAuth/presentationSection";
import { CardsSection } from "@/src/components/HomeNoAuth/cardsSection";
import { SlideSection } from "@/src/components/HomeNoAuth/slidSection";
import { GetStaticProps } from "next";
import { courseService } from "@/src/services/courseService";
import { ReactNode } from "react";
import { CouseType } from "@/src/services/courseService";
import { Footer } from "@/src/components/common/footer";
import aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Tosat } from "@/src/components/common/toast";



interface IndexPageProps {
  children?: ReactNode;
  course: CouseType[];
}

const HomeNotAuth = function ({ course }: IndexPageProps) {
  useEffect(() => {
    aos.init();
  }, []);




  const [ToasrColor, setToasrColor] = useState("");
  const [ToastIsopen, setToastIsOpen] = useState(false);
  const [Toasmessage, setToasmessage] = useState("");
  const router = useRouter();
  
  
  useEffect(() => {
    const registerSuccess = router.query.logout;
  
    
    if (registerSuccess== "true") {
      setToasrColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToasmessage('logout realizado com sucesso! ');
    }
  }, [router.query])


  return (
    <>
      <Head>
        <title>OneBitFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Onebitflix" key="title" />
        <meta
          name="description"
          content="Tenha acesso aos melhores conteudos de progamação de forma simples e fácil!"
        />
      </Head>
      <main>
        <div
          className={styles.sectionBackground}
          data-aos="fade-zoom-in"
          data-aos-duration="1600"
        >
          <HeaderNoAuth />
          <PresentationSection />
        </div>

        <div data-aos="fade-rigth" data-aos-duration="1600">
          <CardsSection />
        </div>

        <div data-aos="fade-up" data-aos-duration="1350">
          <SlideSection newestCourse={course} />
        </div>

        <div className="bg-black">
        <Footer/>
        </div>
        <Tosat color={ToasrColor} isOpen={ToastIsopen} message={Toasmessage} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewstCourses();
  return {
    props: {
      course: res.data,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default HomeNotAuth;
