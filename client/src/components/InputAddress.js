import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { Row, Form } from "react-bootstrap";
import "components/css/InputAddress.css";

const InputAddress = ({ address, setAddress }) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!!address) return;
    console.log("OK 선택");
    console.log(address);
    closeModal();
  }, [address]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleComplete = (data) => {
    let fullAddress = data.query;

    setAddress(fullAddress);
    setModalOpen(false);
    console.log(fullAddress);
  };

  return (
    <>
      <Row style={{ width: "100%" }}>
        <Form style={{ width: "100%" }}>
          <Form.Control
            placeholder="주소를 입력해주세요."
            onFocus={openModal}
            value={address}
          />
        </Form>
        <div className={modalOpen ? "openModal modal" : "modal"}>
          {modalOpen ? (
            <section>
              <header>
                주소를 입력해주세요.
                <button className="close" onClick={closeModal}>
                  &times;
                </button>
              </header>
              <main>
                <DaumPostcode onComplete={handleComplete} />
              </main>
              <footer>
                <button className="close" onClick={closeModal}>
                  close
                </button>
              </footer>
            </section>
          ) : null}
        </div>
      </Row>
    </>
  );
};

export default InputAddress;
