import { Footer } from "@/src/components/common/footer";
import { HeaderAuth } from "@/src/components/common/headerAuth";
import PageSpinner from "@/src/components/common/spiner";
import { EpisodeList } from "@/src/components/episodeList";
import { courseService, CouseType } from "@/src/services/courseService";
import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import styles from "../../styles/coursePage.module.scss";

export default function CoursePage() {
  const [course, setCourse] = useState<CouseType>();
  const [liked, setLiked] = useState(false);
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  
  const getCourses = async () => {
    if (typeof id !== "string") return;
    const res = await courseService.getEpsides(id);
    
    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.Liked);
      setFav(res.data.Favorite);
    }
  };
  
  useEffect(() => {
    getCourses();
  }, [id]);
  
  const handLikeCourse = async () => {
    if (typeof id !== "string") return;
    
    if (liked === true) {
      await courseService.like(id);
      setLiked(false);
    } else {
      await courseService.like(id);
      setLiked(true);
    }
  };
  
  const handFavCourse = async () => {
    if (typeof id !== "string") return;

    if (fav === true) {
      await courseService.AddToFavorite(id);
      setFav(false);
    } else {
      await courseService.AddToFavorite(id);
      setFav(true);
    }
  };
  
  if (course === undefined) return <PageSpinner />;
  
  if (loading) {
    return <PageSpinner />;
  }
  return (
    <>
      <Head>
        <title>OneBitflix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: " center",
            minHeight: "550px",
          }}
          >
          <HeaderAuth />
        </div>
        <Container className={styles.info}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={course?.episodes?.length === 0 ? true : false}
          >
            Assitir agora!
            <img
              src="/buttonPlay.svg"
              alt="Button"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            {liked ? (
              <img
                src="/course/iconLiked.svg "
                alt="likeimg"
                className={styles.interactionsImages}
                onClick={handLikeCourse}
              />
            ) : (
              <img
                src="/course/iconLike.svg "
                alt="like"
                className={styles.interactionsImages}
                onClick={handLikeCourse}
              />
            )}

            {fav ? (
              <img
                src="/course/iconFavorited.svg "
                alt="like"
                className={styles.interactionsImages}
                onClick={handFavCourse}
              />
            ) : (
              <img
                src="/course/iconAddFav.svg "
                alt="like"
                className={styles.interactionsImages}
                onClick={handFavCourse}
              />
            )}
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>Episódios</p>
          <p className={styles.episodeLength}>
            {course.episodes?.length} episódios
          </p>
          {course.episodes?.length === 0 ? (
            <p>
              <strong>
                Não temos episodes ainda, volte outra hora! &#x1F606;&#x1F918;
              </strong>
            </p>
          ) : (
            course?.episodes?.map((episode) => (
              <EpisodeList
                key={episode.id}
                episodes={episode}
                course={course}
              />
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
}
