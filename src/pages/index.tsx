import React from "react";
import styles from "../../styles/Home.module.css";
import Home from "./Home/index";

export default function HomePage() {

  if (typeof window !== 'undefined') {
    document.title = 'IBAV RP - Inscrição'
  }

  return (
    <div className={styles.container}>
      <Home />
    </div>
  );
}
