import FileUpload from "../components/FileUpload";
import QuestionInput from "../components/QuestionInput";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Knowledge Base</h1>
        <p className={styles.description}>
          Upload your documents and ask anything.
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.uploadSection}>
          <FileUpload />
        </section>

        <section className={styles.inputSection}>
          <QuestionInput />
        </section>
      </div>
    </main>
  );
}
