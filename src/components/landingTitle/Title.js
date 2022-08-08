import styles from "./Title.module.scss";

const Title = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blank </h1>
      <h1 className={styles.title}>Crypto </h1>
      <h1 className={styles.title}>Internship</h1>
    </div>
  );
};

export default Title;
