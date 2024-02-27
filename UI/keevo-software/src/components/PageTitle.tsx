import React, { useState } from "react";
import { Col, Modal, Row } from "reactstrap";
import { Button } from "./Button";
import { BodyModal, FooterModal, HeaderModal } from "./Modal";
import { IOptionsProps, Select } from "./Select";

interface IPageTitle {
  title: string;
  subTitle?: string;
  md: string;
}

export const PageTitle: React.FC<IPageTitle> = ({ title, md }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const menu: IOptionsProps[] = [
    { label: "Selecione", id: undefined, selected: true },
    { label: "Tarefa", id: 1, selected: true },
    { label: "Status", id: 2, selected: true },
    { label: "Usuário", id: 3, selected: true },
  ];
  return (
    <Col
      md={md}
      style={{
        marginBottom: "10px",
        color: "#2A004E",
        fontSize: "24px",
        fontFamily: "inherit",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        type="keevo"
        iconCheck="fa-bars"
        text="Menu"
        style={{ height: "auto", width: "100px", margin: "10px" }}
        eventOnClickButton={() => setModalOpen(true)}
      />
      <h1 style={{ marginLeft: "10px" }}>
        <strong>{title}</strong>
      </h1>
      <Modal isOpen={modalOpen} className="modal-sm">
        <HeaderModal
          toggle={() => {
            setModalOpen(!modalOpen);
          }}
        >
          Menu
        </HeaderModal>
        <BodyModal>
          <Row>
            <Select
              id={"selectMenu"}
              name={"selectMenu"}
              options={menu}
              onChange={({ target }) => {
                target.value === "1" &&
                  (window.location.href = "http://localhost:3000/tarefa");
                target.value === "2" &&
                  (window.location.href = "http://localhost:3000/status");
                target.value === "3" &&
                  (window.location.href = "http://localhost:3000/usuario");
              }}
            />
          </Row>
        </BodyModal>
        <FooterModal>
          <Button
            type="white"
            text="Fechar"
            eventOnClickButton={() => setModalOpen(!modalOpen)}
            iconCheck="fa-close"
          />
        </FooterModal>
      </Modal>
    </Col>
  );
};
