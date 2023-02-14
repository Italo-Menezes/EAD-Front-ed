import { Footer } from "@/src/components/common/footer";
import PageSpinner from "@/src/components/common/spiner";
import { Tosat } from "@/src/components/common/toast";
import { FavoriteCategory } from "@/src/components/HomeAuth/favoriteCategory";
import { FeaturedCategory } from "@/src/components/HomeAuth/FeatueredCategory";
import { FeaturedSection } from "@/src/components/HomeAuth/FeaturedSection";
import { ListCategory } from "@/src/components/HomeAuth/listcategory";
import { NewsCategory } from "@/src/components/HomeAuth/newstCategory";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomeAuth = () => {
  const [ToasrColor, setToasrColor] = useState("");
  const [ToastIsopen, setToastIsOpen] = useState(false);
  const [Toasmessage, setToasmessage] = useState("");
  const router = useRouter(); 
  useEffect(() => {
    const registerSuccess = router.query.login;

    if (registerSuccess == "true") {
      setToasrColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToasmessage("Logado com sucesso!");
    }
  }, [router.query]);

  const [loading, setLoading] = useState(true);


 

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
        <title>OneBitflix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <main>
        <FeaturedSection />
        <NewsCategory />
        <FavoriteCategory />
        <FeaturedCategory />
        <ListCategory />
        <div className="bg-black">
        <Footer/>
        </div>
        <Tosat color={ToasrColor} isOpen={ToastIsopen} message={Toasmessage} />
      </main>
    </>
  );
};

export default HomeAuth;
