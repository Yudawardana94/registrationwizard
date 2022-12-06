import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/Wizards.module.css";

function Summary() {
  const navigate = useRouter();
  const onNavigateToScreen = (screen) => {
    if (screen === "back") {
      navigate.back();
      return;
    }
    navigate.push(`/`);
  };
  return (
    <div className={styles.container}>
      <div>
        <h1>Summary</h1>
        <button onClick={() => onNavigateToScreen("back")}>kembali</button>
        <button onClick={() => onNavigateToScreen("home")}>
          Ajukan Sekarang
        </button>
      </div>
    </div>
  );
}

export default Summary;
