import styles from "./styles.module.scss";
import useSWR from "swr";
import { courseService, CouseType } from "@/src/services/courseService";
import { HeaderAuth } from "../../common/headerAuth";
import { Button, Container, Spinner } from "reactstrap";
import Link from "next/link";
import PageSpinner from "../../common/spiner";

export const FeaturedSection = () => {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return error.message;
  if (!data) {
    return <PageSpinner/>
  } 

  return (
    <>
      {
        data.data?.map((course: CouseType) => (
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center center", 
              height:"480px"


            }}
            key={course.id}
          >
            <HeaderAuth />

            <Container className="pt-4">
              <p className={styles.title}>{course.name}</p>
              <p className={styles.synopsis}>{course.synopsis}</p>
              <Link
                href={`/course/${course.id}`}
                className="text-decoration-none"
              >
                <Button outline color="light" className={styles.button}>
                  ACESSE AGORA
                  <img
                    src="/buttonPlay.svg"
                    alt="bottonimg"
                    className={styles.buttonImg}
                  />
                </Button>
              </Link>
            </Container>
          </div>
        ))[0]
      }
    </>
  );
};
