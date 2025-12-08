"use client";

import React, { useState, useRef } from "react";
import styles from "./styles.module.css";

export default function FileUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      alert("Files uploaded successfully!");
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        className={`${styles.container} ${dragActive ? styles.dragActive : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          className={styles.hiddenInput}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".pdf,.txt,.doc,.docx"
        />

        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <h3 className={styles.title}>Click to upload or drag and drop</h3>
        <p className={styles.subtitle}>PDF, Text, or Docs (Max 10MB)</p>
      </div>

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, i) => (
            <div key={`${file.name}-${i}`} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <button
                className={styles.removeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className={styles.uploadButton}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      )}
    </div>
  );
}
