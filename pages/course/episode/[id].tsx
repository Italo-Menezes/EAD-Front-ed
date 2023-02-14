import { HeaderGeneric } from "@/src/components/common/headerGeneric";
import { courseService, CouseType } from "@/src/services/courseService";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../../styles/episodes.module.scss";
import { useEffect, useState } from "react";
import PageSpinner from "@/src/components/common/spiner";
import { Button, Container } from "reactstrap";
import React from "react";
import ReactPlayer from "react-player";

const EpisodeList = () => {
  const router = useRouter();
  const [course, setCourse] = useState<CouseType>();
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const courseId = router.query.courseId?.toString() || "";
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);


  const getCourse = async () => {
    if (typeof courseId !== "string") return;

    const res = await courseService.getEpsides(courseId);

    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handNextpisode = () => {
    router.push(`/course/episode/${episodeOrder + 1}?courseId=${course?.id}`);
  };
  const handlastEpisode = () => {
    router.push(`/course/episode/${episodeOrder - 1}?courseId=${course?.id}`);
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course?.episodes === undefined) return <PageSpinner />;






  

  if(loading) {
    return <PageSpinner/>
  }

  


  return (
    <>
      <Head>
        <title>OnebitFlix - {course.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/home"
          BtnContent={"voltar para o curso"}
          btnUrl={`/course/${courseId}`}
        />
        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
          <p className={styles.episodesTitle}>
            {course.episodes[episodeOrder].name}
          </p>

          {typeof window === "undefined" ? null : (
            <iframe
              className={styles.episodesVideo}
              src={`${
                process.env.NEXT_PUBLIC_BASEURL
              }/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("onebitflix-token")}`}
              allow="fullscreen; picture-in-picture "
              allowFullScreen
            ></iframe>
          )}

          <div className={styles.episodeBtnDiv}>
            <Button
              className={styles.episodeBtn}
              disabled={episodeOrder === 0 ? true : false}
              onClick={handlastEpisode}
            >
              <img
                src="/episode/iconArrowLeft.svg"
                alt="setaE"
                className={styles.arrowImg}
              />
            </Button>
            <Button
              className={styles.episodeBtn}
              disabled={
                episodeOrder + 1 === course.episodes.length ? true : false
              }
              onClick={handNextpisode}
            >
              <img
                src="/episode/iconArrowRight.svg"
                alt="setaD"
                className={styles.arrowImg}
              />
            </Button>
          </div>


              <p className="text-center py-4 ">{course.episodes[episodeOrder].synopsis}</p>

        </Container>
      </main>
    </>
  );
};

export default EpisodeList;
