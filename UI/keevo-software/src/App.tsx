import React, { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { Table } from "./components/Table";
import axios, { AxiosResponse } from "axios";
import { HeaderModal, Modal } from "./components/Modal";
import { PageTitle } from "./components/PageTitle";
import { Col, Row } from "reactstrap";

interface ITarefa {
  descricao: string;
  id: number;
  nome: string;
  status: number;
  usuarioId?: number;
}
const App: React.FC = () => {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const listarTarefas = async function fetchTarefas() {
    const dados: AxiosResponse<ITarefa[]> = await axios.get(
      "https://localhost:7067/api/Tarefa/Listar"
    );
    setTarefas(dados.data);
    console.log(dados.data);
  };

  return (
    <>
      <Row>
        <PageTitle title={"Cadastro de tarefa"} md={"8"}></PageTitle>
        <Col md="4">
          <Row>
            <Col md="4">
              <Button
                type={"keevo"}
                text="Novo"
                iconCheck="fa-plus"
                eventOnClickButton={() => {
                  setModalOpen(!modalOpen);
                }}
              />
            </Col>
            <Col md="4">
              <Button
                type={"keevo"}
                text="Editar"
                iconCheck="fa-edit"
                eventOnClickButton={() => {
                  setModalOpen(!modalOpen);
                }}
              />
            </Col>
            <Col md="4">
              <Button
                type={"keevo"}
                text="novo"
                iconCheck="fa-plus"
                eventOnClickButton={() => {
                  setModalOpen(!modalOpen);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Button
        type={"secondary"}
        text="novo"
        iconCheck="fa-plus"
        eventOnClickButton={() => {
          listarTarefas();
          setModalOpen(!modalOpen);
        }}
      />

      <Table
        columns={[
          { title: "Nome", field: "nome" },
          { title: "Descrição", field: "descricao" },
          { title: "Usuário", field: "usuarioId" },
          { title: "Status", field: "status" },
        ]}
        data={tarefas}
      />
      <Modal isOpen={modalOpen} className="modal-lg">
        <HeaderModal
          toggle={() => {
            setModalOpen(!modalOpen);
          }}
        >
          aa
        </HeaderModal>
      </Modal>
    </>
  );
};

export default App;
