import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/Wizards.module.css";
function Image() {
  const navigate = useRouter();
  const [ktp, setKTP] = useState(null);

  const providedData = ["No. Polisi", "Nama Tertanggung", "No. Polis"];

  const onNavigateToScreen = (screen) => navigate.push(`/wizards/${screen}`);
  const onClaimButtonClicked = () => {
    // Condition to handle if photo is not uploaded yet
    if (!ktp) return false;
    onNavigateToScreen("summary");
  };
  const onKtpUploaded = (e) => {
    setKTP("Oke");
  };
  return (
    <div className={styles.container}>
      <div>
        <p>{"<-"} Back Home</p>
        <div>
          <p>Unggah Foto KTP</p>
        </div>
        <div>
          {providedData.map((req) => {
            return <p key={req}>{req}</p>;
          })}
        </div>
        <div>
          <p>Foto KTP</p>
          <div onClick={(e) => onKtpUploaded(e)}>
            <p>Ini misalkan fotonya</p>
          </div>
          <p>* Data pada KTP harus terlihat jelas.</p>
        </div>
      </div>
      <div onClick={onClaimButtonClicked}>
        <p>Ajukan Sekarang</p>
      </div>
    </div>
  );
}

export default Image;
