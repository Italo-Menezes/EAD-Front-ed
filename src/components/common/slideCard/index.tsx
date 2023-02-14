import styles from "./styles.module.scss";
import { CouseType } from "../../../services/courseService";
import Link from "next/link";

interface Props {
  course: CouseType;
}

export const SlideCard = ({ course }: Props) => {
  return (
    <>
     <Link href={`/course/${course.id}`} className="text-decoration-none">
     <div className={styles.slide}>
        <img
          src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
          alt={course.name}
          className={styles.slideImg}
        />
        <p className={styles.Title}>{course.name}</p>
        <p className={styles.descripition}>{course.synopsis}</p>
      </div>
     </Link>
    </>
  );
};
