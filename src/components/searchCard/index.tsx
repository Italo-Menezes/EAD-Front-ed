import styles from "./styles.module.scss";
import { CouseType } from "../../services/courseService";
import Link from "next/link";

interface props {
  course: CouseType;
}

export const SearchCard = ({ course }: props) => {
  return (
    <>
      <Link href={`course/${course.id}`} className="text-decoration-none">
        <div className={styles.searchCard}>
          <img
            src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
            alt={`${course.name}`}
            className={styles.searchCardImg}
          />
          <p className={styles.searchCarName}>{course.name}</p>
          <p className={styles.descripition}>{course.synopsis}</p>
        </div>
      </Link>
    </>
  );
};
