import React from "react";
import styles from "../../styles/Home.module.css";
import Home from "./Home/index";

export default function HomePage() {
  return (
      <div className={styles.container}>
        <Home />
      </div>
  );
}
