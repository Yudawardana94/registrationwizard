import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, DatePicker, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Select from "react-select";

import { saveData } from "../../actions";
import styles from "../../styles/Wizards.module.css";

function Form() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { userData, registeredLicence, dataFormG } = useSelector(
    (state) => state
  );

  const [userDataLocal, setUserDataLocal] = useState({});
  const [dataForm, setDataForm] = useState(dataFormG);

  useEffect(() => {
    // if (!userDataLocal) return navigate.push(`/`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const woundTypeOptions = [
    {
      label: "Luka - luka dan masih dirawat di RS",
      value: "Luka - luka dan masih dirawat di RS",
    },
    {
      label: "Luka - luka dan sudah pulang dari RS",
      value: "Luka - luka dan sudah pulang dari RS",
    },
    {
      label: "Meninggal dunia setelah menjalani perawatan",
      value: "Meninggal dunia setelah menjalani perawatan",
    },
    {
      label: "Meninggal dunia di lokasi kejadian",
      value: "Meninggal dunia di lokasi kejadian",
    },
  ];

  const personalDataInput = [
    {
      title: "Nomor Induk Kependudukan (NIK)",
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
      option: woundTypeOptions,
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
      option: genderOptions,
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

  const onNavigateToScreen = (screen) => {
    dispatch(saveData(dataForm));
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
  const onDateChange = (e, e2) => {
    setDataForm((data) => {
      return {
        ...data,
        date: e2,
      };
    });
  };
  const onDropdownChange = (e, field) => {
    setDataForm((data) => {
      return {
        ...data,
        [field]: e.value,
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <div
            className={styles.backButton}
            onClick={() => onNavigateToScreen("back")}
          >
            <LeftOutlined />
            <p>Back</p>
          </div>
          <div className={styles.process}>
            <p>Formulir Claim</p>
          </div>
          <div className={styles.claimBlock}>
            <p>Registrasi Klaim: {registeredLicence}</p>
          </div>
          <div className={styles.inputGroup}>
            {userDataLocal &&
              Object.entries(userDataLocal).map(([key, value]) => {
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
            <p className={styles.inputGroupTitle}>Data Diri</p>
            {personalDataInput.map((data) => {
              switch (data.type) {
                case "text-input":
                  return (
                    <div key={data.title}>
                      <p>{data.title}</p>
                      <Input.TextArea
                        rows={4}
                        value={dataForm[data.field]}
                        onChange={(e) => onInputData(e, data.field)}
                        placeholder={data.placeholder}
                      />
                    </div>
                  );
                case "dropdown":
                  return (
                    <div key={data.title}>
                      <p>{data.title}</p>
                      <Select
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            fontSize: "12px",
                            borderRadius: "4px",
                          }),
                        }}
                        defaultValue={data.value}
                        onChange={(e) => onDropdownChange(e, data.field)}
                        isSearchable
                        options={data.option}
                      />
                    </div>
                  );
                case "date-picker":
                  return (
                    <div key={data.title}>
                      <p>{data.title}</p>
                      <DatePicker
                        defaultValue={dataForm[data.field]}
                        placeholder={data.placeholder}
                        onChange={onDateChange}
                      />
                    </div>
                  );
                default:
                  return (
                    <div key={data.title}>
                      <p>{data.title}</p>
                      <Input
                        value={data.value}
                        onChange={(e) => onInputData(e, data.field)}
                        placeholder={data.placeholder}
                      />
                    </div>
                  );
              }
            })}
          </div>
          <div className={styles.inputGroup}>
            <p className={styles.inputGroupTitle}>Detail Kejadian</p>
            {accidentDetailInput.map((data) => {
              switch (data.type) {
                case "text-input":
                  return (
                    <div key={data.title}>
                      <p>{data.title}</p>
                      <Input.TextArea
                        rows={4}
                        value={dataForm[data.field]}
                        onChange={(e) => onInputData(e, data.field)}
                        placeholder={data.placeholder}
                      />
                    </div>
                  );
                case "dropdown":
                  return (
                    <div key={data.title}>
                      <p>{data.title}</p>
                      <Select
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            fontSize: "12px",
                            borderRadius: "4px",
                          }),
                        }}
                        isSearchable
                        options={data.option}
                      />
                    </div>
                  );
                case "date-picker":
                  return (
                    <div key={data.title}>
                      <p>
                        {data.title}
                        {dataForm.date}
                      </p>
                      <DatePicker
                        placeholder={data.placeholder}
                        onChange={onDateChange}
                      />
                    </div>
                  );
                default:
                  return (
                    <div key={data.title}>
                      <p>{data.title}</p>
                      <Input
                        value={data.value}
                        onChange={(e) => onInputData(e, data.field)}
                        placeholder={data.placeholder}
                      />
                    </div>
                  );
              }
            })}
          </div>
        </div>
      </div>
      <div>
        {/* <Link href={"/wizards/image"}> */}
        <Button
          type="primary"
          onClick={() => onNavigateToScreen("image")}
          className={styles.bottomButton}
        >
          Berikutnya
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Form;
