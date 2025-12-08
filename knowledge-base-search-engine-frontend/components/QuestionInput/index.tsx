"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  loading?: boolean;
}

export default function QuestionInput({
  onSubmit,
  loading,
}: QuestionInputProps) {
  const [question, setQuestion] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!question.trim() || loading) return;

    onSubmit(question);
    setQuestion("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Ask a question about your documents..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={!question.trim() || loading}
          aria-label="Send question"
        >
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}
