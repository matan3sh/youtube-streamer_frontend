import { ReactElement } from "react";
import HomePageLayout from "../layout/Home";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Next App</h1>
    </div>
  );
};

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
