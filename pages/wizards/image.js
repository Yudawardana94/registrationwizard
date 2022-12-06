/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Upload, Row, Col, Slider, Modal } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

import styles from "../../styles/Wizards.module.css";

function Image() {
  const navigate = useRouter();
  const { userData } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [userDataLocal, setUserDataLocal] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomVal, setZoomVal] = useState(0);

  const hiddenFileInput = useRef(null);

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
    if (!imageUrl) return false;
    onNavigateToScreen("summary");
  };

  const handleChange = (info) => {
    let files = info.target.files;
    let reader = new FileReader();
    reader.onload = (r) => {
      let url = r.target.result;
      setLoading(false);
      setImageUrl(url);
    };
    reader.readAsDataURL(files[0]);
  };

  const onSliderChange = (val) => setZoomVal(val);

  const handleUpload = () => {
    hiddenFileInput.current.click();
    console.log("pencet disini");
  };

  const UploadBlock = () => (
    <div onClick={handleUpload} className={styles.uploadBlock}>
      <div className={styles.innerBlock}>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
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
                <>
                  <UploadBlock />
                  <input
                    type="file"
                    onChange={handleChange}
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                  />
                </>
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
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={"60vw"}
      >
        <div className={styles.imageModalZoomWrapper}>
          <img
            src={imageUrl}
            alt="avatar"
            className={styles.imageModalZoom}
            style={{
              transform: `scale(${100 + zoomVal}%)`,
            }}
          />
        </div>
        <Slider defaultValue={0} onChange={onSliderChange} />
      </Modal>
    </div>
  );
}

export default Image;
