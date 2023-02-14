import styles from "../styles/search.module.scss";
import { HeaderAuth } from "@/src/components/common/headerAuth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { courseService, CouseType } from "@/src/services/courseService";
import { useEffect } from "react";
import { Container } from "reactstrap";
import { SearchCard } from "@/src/components/searchCard";
import { Footer } from "@/src/components/common/footer";
import PageSpinner from "@/src/components/common/spiner";

const search = () => {
  const router = useRouter();
  const searchName: any = router.query.name;
  const [searchResults, setSearchResults] = useState<CouseType[]>([]);

 
  
useEffect(() => {
  if(!sessionStorage.getItem("onebitflix-token")) {
    router.push('/login');
  }
}, [])
 

  const searchCourses = async () => {
    const res = await courseService.getSearch(searchName);

    setSearchResults(res.data.courses);
  };

  useEffect(() => {
    searchCourses();
  }, [searchName]);




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
        <title> OneBitFlix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <main className={styles.searchResult}>
        <HeaderAuth />
        {searchResults.length >= 1 ? (
          <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
            {searchResults?.map((course) => (
              <SearchCard key={course.id} course={course} />
            ))}
          </Container>
        ) : (
          <p className={styles.noSearchResult}>Nenhum resutado encrontado </p>
        )}
      </main>
      <Footer/>
    </>
  );
};

export default search;
