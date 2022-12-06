import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Button, Input, DatePicker, Row, Col } from "antd";
import Select from "react-select";

import styles from "../../styles/Wizards.module.css";

function Form() {
  const navigate = useRouter();
  const { userData, registeredLicence } = useSelector((state) => state);

  const [userDataLocal, setUserDataLocal] = useState({});
  const [dataForm, setDataForm] = useState({
    driver: "",
    date: null,
    gender: null,
    detail: "",
  });

  useEffect(() => {
    setUserDataLocal({
      "No. Polisi": userData.licence,
      "Nama Tertanggung": userData.name,
      "No. Polis": userData.polisId,
      Periode: userData.period.endDate,
      "Nilai Pertanggungan": userData.price,
      "Buatan / Merk": userData.machine.brand,
      "Tahun Pembuatan": userData.machine.productionYear,
      "No. Mesin": userData.machine.machineNumber,
      "No. Rangka": userData.machine.chassisNumber,
    });
  }, []);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const dataInputObj = [
    {
      title: "Nama Pengemudi",
      type: "input",
      value: dataForm.driver,
      placeholder: "Driver's name",
    },
    {
      title: "Jenis Kelamin",
      type: "dropdown",
      value: dataForm.gender,
      placeholder: "Driver's name",
    },
    {
      title: "Tanggal dan waktu kejadian",
      type: "date-picker",
      value: dataForm.date,
    },
    {
      title: "Detail Kejadian",
      type: "text-input",
      value: dataForm.detail,
    },
  ];

  const onNavigateToScreen = (screen) => {
    if (screen === "back") {
      navigate.back();
      return;
    }
    navigate.push(`/wizards/${screen}`);
  };

  const onInputData = (e, field) => {
    e.preventDefault();
    setDataForm((data) => {
      return {
        ...data,
        [field]: e.target.value,
      };
    });
  };
  const onDateChange = (_, dateString) => {
    setDataForm((data) => {
      return {
        ...data,
        date: dateString,
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <button onClick={() => onNavigateToScreen("back")}>back</button>
          <div className={styles.process}>
            <p>Formulir Claim</p>
          </div>
          <div className={styles.claimBlock}>
            <p>Registrasi Klaim: {registeredLicence}</p>
          </div>
          <div className={styles.inputGroup}>
            {Object.entries(userDataLocal).map(([key, value]) => {
              return (
                <Row key={key} className={styles.gridRequired}>
                  <Col span={10}>
                    <b>{key}</b>
                  </Col>
                  <Col span={14}>
                    <p>: {value}</p>
                  </Col>
                </Row>
              );
            })}
          </div>

          <div className={styles.inputGroup}>
            {dataInputObj.map((el) => {
              switch (el.type) {
                case "text-input":
                  return (
                    <div key={el.title}>
                      <p>{el.title}</p>
                      <Input.TextArea
                        rows={4}
                        value={el.value}
                        onChange={(e) => onInputData(e, "detail")}
                        placeholder={el.placeholder}
                      />
                    </div>
                  );
                case "dropdown":
                  return (
                    <div key={el.title}>
                      <p>{el.title}</p>
                      <Select
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            fontSize: "12px",
                            borderRadius: "4px",
                          }),
                        }}
                        isSearchable
                        options={genderOptions}
                      />
                    </div>
                  );
                case "date-picker":
                  return (
                    <div key={el.title}>
                      <p>{el.title}</p>
                      <DatePicker
                        placeholder={el.placeholder}
                        onChange={onDateChange}
                      />
                    </div>
                  );
                default:
                  return (
                    <div key={el.title}>
                      <p>{el.title}</p>
                      <Input
                        value={el.value}
                        onChange={(e) => onInputData(e, "driver")}
                        placeholder="type driver's name here"
                      />
                    </div>
                  );
              }
            })}
          </div>
        </div>
      </div>

      <div>
        <Button
          type="primary"
          onClick={() => onNavigateToScreen("image")}
          className={styles.bottomButton}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
}

export default Form;
