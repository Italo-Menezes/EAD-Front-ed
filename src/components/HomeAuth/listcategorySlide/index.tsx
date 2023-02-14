import useSWR from "swr";
import { categoriesService } from "@/src/services/categotiasService";
import { SlideComponent } from "../../common/slideComponent";
import styles  from "../../../../styles/slideCategory.module.scss";
import { Spinner } from "reactstrap";
import PageSpinner from "../../common/spiner";


interface props {
  categoryId: number;
  categoryName: string;
}

export const ListCategorySlide = ({ categoryId, categoryName }: props) => {
  const { data, error } = useSWR(`/CategoryCourses/${categoryId}`, () =>
    categoriesService.getCourses(categoryId)
  );

  if (error) return error;
  if (!data){
    return <PageSpinner/>
  } 

  return (
  <>
    <p className={styles.titleCategory}>{categoryName}</p>
  <SlideComponent course={data.data.courses} />
  </>
  );
};
