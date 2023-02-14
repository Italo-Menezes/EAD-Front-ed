import { courseService } from "@/src/services/courseService";
import styles from "../.././../../styles/slideCategory.module.scss";
import useSWR from "swr";
import { SlideComponent } from "../../common/slideComponent";
import { Spinner } from "reactstrap";
import PageSpinner from "../../common/spiner";

export const FavoriteCategory = () => {
  const { data, error } = useSWR("/favorites", courseService.getFavCourse);

  if (error) return error;
  if (!data) {
    return <PageSpinner/>
  } 


  return (
    <>
      <p className={styles.titleCategory}>Minha lista</p>
      {data.data.courses.length >= 1  ? (
        <SlideComponent course={data.data.courses}/>
        ): (
          <p className="text-center p-3 h5">
            <strong>Não há cursos na sua lista de favoritos</strong>
          </p>
        )}
    </>
  );
};