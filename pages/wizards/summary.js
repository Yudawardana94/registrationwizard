/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Button, Row, Col, Switch } from "antd";
import Link from "next/link";

import styles from "../../styles/Wizards.module.css";

function Summary() {
  const navigate = useRouter();
  const state = useSelector((state) => state);

  const [dataForm] = useState(state.dataFormG);

  const userData = ["name", "polisId", "licence"];
  const personalDataInput = [
    {
      title: "NIK",
      type: "input",
      value: dataForm.residenceId,
      field: "residenceId",
      placeholder: "Nomor Induk Kependudukan (NIK)",
    },
    {
      title: "Nama Korban",
      type: "input",
      value: dataForm.victim,
      field: "victim",
      placeholder: "Nama korban",
    },
    {
      title: "Sifat Cidera",
      type: "dropdown",
      value: dataForm.wound,
      field: "wound",
      placeholder: "Jenis luka",
    },
    {
      title: "Umur",
      type: "input",
      option: [],
      value: dataForm.age,
      field: "age",
      placeholder: "Umur",
    },
    {
      title: "Jenis Kelamin",
      type: "dropdown",
      value: dataForm.gender,
      field: "gender",
      placeholder: "Jenis Kelamin",
    },
    {
      title: "Np Hp Korban",
      type: "input",
      value: dataForm.phone,
      field: "phone",
      placeholder: "No Hp Korban",
    },
    {
      title: "Alamat korban",
      type: "input",
      value: dataForm.address,
      field: "address",
      placeholder: "Alamat Korban",
    },
  ];
  const accidentDetailInput = [
    {
      title: "Lokasi / Alamat Kejadian",
      type: "input",
      value: dataForm.place,
      field: "place",
    },
    {
      title: "Tanggal dan waktu kejadian",
      type: "date-picker",
      value: dataForm.date,
      field: "date",
    },
    {
      title: "Detail Kejadian",
      type: "text-input",
      value: dataForm.detail,
      field: "detail",
    },
  ];

  const [showJSON, setShowJSON] = useState(true);

  useEffect(() => {
    if (!state.userData) return navigate.push(`/`);
  }, []);

  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
    setShowJSON(checked);
  };

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
        <div className={styles.switchWrapper}>
          <p>Pretify</p>
          <Switch
            defaultChecked
            onChange={onChangeSwitch}
            className={styles.switchswitch}
          />
          <p>Show JSON</p>
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.inputGroupTitle}>Data Penanggung</p>
          {showJSON ? (
            <p>{JSON.stringify(state.userData, null, 4)}</p>
          ) : (
            userData.map((el) => {
              return (
                <Row key={el} className={styles.gridRequired}>
                  <Col span={6}>
                    <b>{el}</b>
                  </Col>
                  <Col span={14}>
                    <p>: {state.userData[el]}</p>
                  </Col>
                </Row>
              );
            })
          )}
        </div>
        <div className={styles.inputGroup}>
          <p className={styles.inputGroupTitle}>Data Diri</p>
          {showJSON ? (
            <p>{JSON.stringify(state.dataFormG, null, 4)}</p>
          ) : (
            personalDataInput.map((el) => {
              return (
                <Row key={el} className={styles.gridRequired}>
                  <Col span={10}>
                    <b>{el.title}</b>
                  </Col>
                  <Col span={14}>
                    <p>: {state.dataFormG[el.field] || "-"}</p>
                  </Col>
                </Row>
              );
            })
          )}
        </div>
        <div className={styles.inputGroup}>
          <p className={styles.inputGroupTitle}>Detail Kejadian</p>
          {showJSON ? (
            <p>{JSON.stringify(state.dataFormG, null, 4)}</p>
          ) : (
            accidentDetailInput.map((el) => {
              return (
                <Row key={el} className={styles.gridRequired}>
                  <Col span={10}>
                    <b>{el.title}</b>
                  </Col>
                  <Col span={14}>
                    <p>: {state.dataFormG[el.field] || "-"}</p>
                  </Col>
                </Row>
              );
            })
          )}
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.inputGroupTitle}>Foto</p>
          {showJSON ? (
            <div className={styles.wrapperClass}>
              <p className={styles.wrapperItem}>
                {JSON.stringify(state.imageUpload)}
              </p>
            </div>
          ) : (
            <img
              src={state.imageUpload}
              alt="avatar"
              className={styles.uploadedImage}
            />
          )}
        </div>
        {/* <Link href={"/wizards/image"}>
          <button>kembali</button>
        </Link> */}
        <div className={styles.buttonWrapper}>
          <Button onClick={() => onNavigateToScreen("back")} type="default">
            Kembali
          </Button>
          <Button onClick={onNavigateToScreen} type="primary">
            Ajukan Sekarang
          </Button>
        </div>
        {/* <Link href={"/"}>
          <button>Ajukan Sekarang</button>
        </Link> */}
      </div>
    </div>
  );
}

export default Summary;
