"use client";

import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import QuestionInput from "../components/QuestionInput";
import AnswerDisplay from "../components/AnswerDisplay";
import styles from "./page.module.css";

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{ type: "user" | "bot"; content: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async (question: string) => {
    setMessages((prev) => [...prev, { type: "user", content: question }]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Failed to get answer");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { type: "bot", content: data.answer }]);
    } catch (error) {
      console.error("Error asking question:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

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

        <AnswerDisplay messages={messages} loading={loading} />

        <section className={styles.inputSection}>
          <QuestionInput onSubmit={handleAskQuestion} loading={loading} />
        </section>
      </div>
    </main>
  );
}
