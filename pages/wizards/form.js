import React from "react";
import { useRouter } from "next/router";

import styles from "../../styles/Wizards.module.css";

function Form() {
  const dataRequired = [
    "No. Polisi",
    "Nama Tertanggung",
    "No. Polis",
    "Periode",
    "Nilai Pertanggungan",
    "Buatan / Merk",
    "Tahun Pembuatan",
    "No. Mesin",
    "No. Rangka",
  ];
  const dataInput = [
    "Nama Pengemudi",
    "tanggal dan waktu kejadian",
    "detail kejadian",
  ];
  const navigate = useRouter();
  const onNavigateToScreen = (screen) => navigate.push(`/wizards/${screen}`);
  return (
    <div className={styles.container}>
      <div>
        <p>{"<-"} Back Home</p>
        <div>
          <p>Formulir Claim</p>
        </div>
        <div>Registrasi Klaim: {"B 1234 EFG"}</div>
        <div>
          {dataRequired.map((req) => {
            return <p key={req}>{req}</p>;
          })}
        </div>

        <div>
          {dataInput.map((input) => {
            return <p key={input}>{input}</p>;
          })}
        </div>
      </div>
      <div onClick={() => onNavigateToScreen("image")}>
        <p>Upload Image</p>
      </div>
    </div>
  );
}

export default Form;
