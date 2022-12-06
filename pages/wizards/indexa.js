import React from "react";
import { useRouter } from "next/router";

import styles from "../../styles/Wizards.module.css";

const Index = () => {
  const wizzard = ["form", "image", "summary"];
  const navigate = useRouter();

  const onNavigateToScreen = (screen) => {
    navigate.push(`wizards/${screen}`);
  };
  return (
    <div className={styles.container}>
      {wizzard.map((el) => (
        <button
          onClick={() => onNavigateToScreen(el)}
          key={el + Math.random() * 1000}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default Index;
