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

interface IUsuario {
  id: number;
  nome: string;
  codigo: string;
  email: string;
}
const UsuarioPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<IUsuario>(
    {} as IUsuario
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const listarUsuario = async function listarStatus() {
    const dados: AxiosResponse<IUsuario[]> = await axios.get(
      "https://localhost:7067/api/Usuario/Listar"
    );
    setUsuarios(dados.data);
    console.log(dados.data);
  };
  const excluir = async function listarUsuarios() {
    try {
      await axios.delete("https://localhost:7067/api/Usuario/Remove", {
        params: {
          id: usuarioSelecionado.id,
        },
      });
      listarUsuario();
      alert("Usuário excluida com sucesso!");
    } catch (ex) {
      alert("Erro ao Excluir");
    }
  };
  const handleSubmit = async (): Promise<void> => {
    try {
      await axios.post<IUsuario>(
        "https://localhost:7067/api/Usuario/Salvar",
        usuarioSelecionado
      );
      alert("Usuário salva com sucesso!");
      listarUsuario();
    } catch (ex) {
      alert("Erro ao salvar");
    }
  };

  return (
    <>
      <Row>
        <PageTitle title={"Cadastro de Usuários"} md={"6"}></PageTitle>
        <Col md="6">
          <Row>
            <Col md="3">
              <Button
                type={"keevo"}
                text="Novo"
                iconCheck="fa-plus"
                eventOnClickButton={() => {
                  setUsuarioSelecionado({} as IUsuario);
                  setModalOpen(!modalOpen);
                }}
              />
            </Col>
            <Col md="3">
              <Button
                type={"keevo"}
                text="Editar"
                iconCheck="fa-edit"
                disabled={!usuarioSelecionado.id}
                eventOnClickButton={() => {
                  setModalOpen(!modalOpen);
                }}
              />
            </Col>
            <Col md="3">
              <Button
                type={"keevo"}
                text="Excluir"
                disabled={!usuarioSelecionado.id}
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
                  listarUsuario();
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        columns={[
          { title: "Id", field: "id" },
          { title: "Nome", field: "nome" },
          { title: "Código", field: "codigo" },
          { title: "E-Mail", field: "email" },
        ]}
        data={usuarios}
        selectionMode="single"
        onSelectionChange={(e) => {
          console.log(e);
          e.length > 0
            ? setUsuarioSelecionado(e[0])
            : setUsuarioSelecionado({} as IUsuario);
        }}
      />

      <Modal isOpen={modalOpen} className="modal-lg">
        <HeaderModal
          toggle={() => {
            setModalOpen(!modalOpen);
          }}
        >
          Cadastro de novo Usuário
        </HeaderModal>
        <form onSubmit={handleSubmit}>
          <BodyModal>
            <Row>
              <Col md="4">
                <Label>Nome:</Label>
                <Input
                  value={usuarioSelecionado.nome}
                  required
                  type="text"
                  onChange={(e) =>
                    setUsuarioSelecionado({
                      ...usuarioSelecionado,
                      nome: e.target.value,
                    })
                  }
                  maxLength={200}
                  placeholder="Nome:"
                />
              </Col>
              <Col md="4">
                <Label>Código:</Label>
                <Input
                  value={usuarioSelecionado.codigo}
                  required
                  type="text"
                  onChange={(e) =>
                    setUsuarioSelecionado({
                      ...usuarioSelecionado,
                      codigo: e.target.value,
                    })
                  }
                  maxLength={100}
                  placeholder="Código:"
                />
              </Col>
              <Col md="4">
                <Label>E-mail:</Label>
                <Input
                  value={usuarioSelecionado.email}
                  required
                  type="text"
                  onChange={(e) =>
                    setUsuarioSelecionado({
                      ...usuarioSelecionado,
                      email: e.target.value,
                    })
                  }
                  maxLength={100}
                  placeholder="E-Mail:"
                />
              </Col>
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

export default UsuarioPage;
