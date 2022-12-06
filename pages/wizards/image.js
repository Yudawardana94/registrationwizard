/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Upload, Row, Col, Slider, Modal } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

import styles from "../../styles/Wizards.module.css";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

function Image() {
  const navigate = useRouter();
  const { userData } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [userDataLocal, setUserDataLocal] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomVal, setZoomVal] = useState(0);

  const providedData = ["No. Polisi", "Nama Tertanggung", "No. Polis"];

  useEffect(() => {
    setUserDataLocal({
      "No. Polisi": userData.licence,
      "Nama Tertanggung": userData.name,
      "No. Polis": userData.polisId,
    });
  }, []);

  const onNavigateToScreen = (screen) => {
    if (screen === "back") {
      navigate.back();
      return;
    }
    navigate.push(`/wizards/${screen}`);
  };
  const onClaimButtonClicked = () => {
    // Condition to handle if photo is not uploaded yet
    if (!imageUrl) return false;
    onNavigateToScreen("summary");
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onSliderChange = (val) => setZoomVal(val);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <button onClick={() => onNavigateToScreen("back")}>back</button>
          <div className={styles.process}>
            <p>Unggah Foto</p>
          </div>
          <div className={styles.inputGroup}>
            {Object.entries(userDataLocal).map(([key, value]) => {
              return (
                <Row key={key} className={styles.gridRequired}>
                  <Col span={10}>
                    <b>{key}</b>
                  </Col>
                  <Col span={14}>
                    <p>{value}</p>
                  </Col>
                </Row>
              );
            })}
          </div>
          <div>
            <div className={styles.imageUploadWrapper}>
              <h4 className={styles.titleText}>Foto KTP</h4>
              {imageUrl ? (
                <div onClick={() => setIsModalOpen(true)}>
                  <img
                    src={imageUrl}
                    alt="avatar"
                    className={styles.uploadedImage}
                  />
                </div>
              ) : (
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploaders"
                  showUploadList={false}
                  onChange={handleChange}
                >
                  {uploadButton}
                </Upload>
              )}
              <p className={styles.bottomNoteText}>
                * Data pada KTP harus terlihat jelas.
              </p>
            </div>
            <div className={styles.deletePhotoWrapper}>
              <div
                onClick={() => setImageUrl(null)}
                className={styles.deletePhoto}
              >
                <DeleteTwoTone twoToneColor="#dc143c" />
                <p className={styles.buttonText}>hapus foto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button
          type="primary"
          onClick={onClaimButtonClicked}
          className={styles.bottomButton}
        >
          Berikutnya
        </Button>
      </div>
      {/* <Modal
        title="Basic Modal"
        open={isModalOpen}
      >
        <div>
          <img
            src={imageUrl}
            alt="avatar"
            className={styles.uploadedImage}
            style={{
              transform: `scale(${100 + zoomVal}%)`,
            }}
          />
          <Slider defaultValue={0} onChange={onSliderChange} />
        </div>
      </Modal> */}
    </div>
  );
}

export default Image;
