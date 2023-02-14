import { CouseType, EpisodeType } from "@/src/services/courseService";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

interface props {
  episodes: EpisodeType;
  course: CouseType;
}


export const EpisodeList = ({ episodes, course }: props) => {

  const router = useRouter();



  const handleSecondsTomin = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    const timeString = (num: number) =>  num.toString().padStart(2, "0");

    const result = `${timeString(minutes)}:${timeString(seconds)}`;

    return result;

  };

  const handleEpisode = () => {
    router.push(`/course/episode/${episodes.order - 1 }?courseId=${course.id}`);
  };
  return (
    <>
      <div className={styles.episodeCard} onClick={handleEpisode}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio Nº {episodes.order}</p>
          <p className={styles.episodeTime}> {handleSecondsTomin(episodes.secondsLong)}</p>
        </div>
        <div className={styles.episodeTitleDecripiton}>
          <p className={styles.episodeTitle}>{episodes.name}</p>
          <p className={styles.episodeDescripiton}>{episodes.synopsis}</p>
        </div>
      </div>
    </>
  );
};

