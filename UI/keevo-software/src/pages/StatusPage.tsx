import React, { useState } from "react";
import { Button } from "../components/Button";
import { Table } from "../components/Table";
import axios, { AxiosResponse } from "axios";
import {
  BodyModal,
  FooterModal,
  HeaderModal,
  Modal,
} from "../components/Modal";
import { PageTitle } from "../components/PageTitle";
import { Col, Input, Label, Row } from "reactstrap";

interface IStatus {
  id: number;
  codigo: string;
}
const StatusPage: React.FC = () => {
  const [status, setStatus] = useState<IStatus[]>([]);
  const [statusSelecionado, setStatusSelecionado] = useState<IStatus>(
    {} as IStatus
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const listarStatus = async function listarStatus() {
    const dados: AxiosResponse<IStatus[]> = await axios.get(
      "https://localhost:7067/api/Status/Listar"
    );
    if (dados.data.length) setStatus(dados.data);
    else alert("Não a dados para serem exibidos");
  };
  const excluir = async function listarUsuarios() {
    try {
      await axios.delete("https://localhost:7067/api/Status/Remove", {
        params: {
          id: statusSelecionado.id,
        },
      });
      listarStatus();
      alert("Status excluida com sucesso!");
    } catch (ex) {
      alert("Erro ao Excluir");
    }
  };
  const handleSubmit = async (): Promise<void> => {
    try {
      await axios.post<IStatus>(
        "https://localhost:7067/api/Status/Salvar",
        statusSelecionado
      );
      alert("Status salva com sucesso!");
      listarStatus();
    } catch (ex) {
      alert("Erro ao salvar");
    }
  };

  return (
    <>
      <Row>
        <PageTitle title={"Cadastro de Status"} md={"8"}></PageTitle>
        <Col md="4">
          <Row>
            <Col md="3">
              <Button
                type={"keevo"}
                text="Novo"
                iconCheck="fa-plus"
                eventOnClickButton={() => {
                  setStatusSelecionado({} as IStatus);
                  setModalOpen(!modalOpen);
                }}
              />
            </Col>
            <Col md="3">
              <Button
                type={"keevo"}
                text="Editar"
                iconCheck="fa-edit"
                disabled={!statusSelecionado.id}
                eventOnClickButton={() => {
                  setModalOpen(!modalOpen);
                }}
              />
            </Col>
            <Col md="3">
              <Button
                type={"keevo"}
                text="Excluir"
                disabled={!statusSelecionado.id}
                iconCheck="fa-trash"
                eventOnClickButton={() => {
                  excluir();
                }}
              />
            </Col>
            <Col md="3">
              <Button
                type={"keevo"}
                text="Filtrar"
                style={{ marginTop: "30px" }}
                iconCheck="fa-filter"
                eventOnClickButton={() => {
                  listarStatus();
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        columns={[
          { title: "Id", field: "id" },
          { title: "Código", field: "codigo" },
        ]}
        data={status}
        selectionMode="single"
        onSelectionChange={(e) => {
          e.length > 0
            ? setStatusSelecionado(e[0])
            : setStatusSelecionado({} as IStatus);
        }}
      />

      <Modal isOpen={modalOpen} className="modal-sm">
        <HeaderModal
          toggle={() => {
            setModalOpen(!modalOpen);
          }}
        >
          Cadastro de novo Status
        </HeaderModal>
        <form onSubmit={handleSubmit}>
          <BodyModal>
            <Row>
              <Label>Código:</Label>
              <Input
                value={statusSelecionado.codigo}
                required
                type="text"
                onChange={(e) =>
                  setStatusSelecionado({
                    ...statusSelecionado,
                    codigo: e.target.value,
                  })
                }
                maxLength={200}
                placeholder="Código:"
              />
            </Row>
          </BodyModal>
          <FooterModal>
            <Button
              type="white"
              text="Fechar"
              classes="w-auto"
              eventOnClickButton={() => setModalOpen(!modalOpen)}
              iconCheck="fa-close"
            />

            <Button
              type="secondary"
              text="Salvar"
              iconCheck="fa-check"
              classes="w-auto"
            />
          </FooterModal>
        </form>
      </Modal>
    </>
  );
};

export default StatusPage;
