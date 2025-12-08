import React from "react";
import styles from "./styles.module.css";

type Message = {
  type: "user" | "bot";
  content: string;
};

interface AnswerDisplayProps {
  messages: Message[];
  loading?: boolean;
}

export default function AnswerDisplay({
  messages,
  loading,
}: AnswerDisplayProps) {
  if (messages.length === 0 && !loading) return null;

  return (
    <div className={styles.container}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${styles.message} ${
            msg.type === "user" ? styles.userMessage : styles.botMessage
          }`}
        >
          <div className={styles.messageHeader}>
            {msg.type === "user" ? "You" : "AI Assistant"}
          </div>
          <div className={styles.content}>{msg.content}</div>
        </div>
      ))}

      {loading && (
        <div className={styles.loading}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      )}
    </div>
  );
}
