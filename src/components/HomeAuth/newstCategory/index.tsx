import useSWR from "swr";
import { courseService } from "@/src/services/courseService";
import { SlideComponent } from "../../common/slideComponent";
import styles from "../../../../styles/slideCategory.module.scss";
import { Spinner } from "reactstrap";
import PageSpinner from "../../common/spiner";

export const NewsCategory = () => {
  const { data, error } = useSWR("/newst", courseService.getNewstCourses);

  if (error) return error;
  if (!data) {
    return <PageSpinner/>
  } 

  return (
    <>
      <p className={styles.titleCategory}>Lançamentos</p>
      <SlideComponent course={data.data} />
    </>
  );
};
