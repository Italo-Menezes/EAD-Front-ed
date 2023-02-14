import {
  categoriesService,
  CategoryType,
} from "@/src/services/categotiasService";
import { Spinner } from "reactstrap";
import useSWR from "swr";
import PageSpinner from "../../common/spiner";
import { ListCategorySlide } from "../listcategorySlide";


export const ListCategory = () => {
  const { data, error } = useSWR(
    "/listCategory",
    categoriesService.getCategories
  );

  if (error) return error;
  if (!data){
    return <PageSpinner/>
  } 

  return (
    <>
      {data.data.categories?.map((category: CategoryType) => (
        <ListCategorySlide key={category.id} categoryId={category.id} categoryName={category.name}/>
      ))}
    </>
  );
};
