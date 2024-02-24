import React, { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { Table } from "./components/Table";
import axios, { AxiosResponse } from "axios";
import { BodyModal, FooterModal, HeaderModal, Modal } from "./components/Modal";
import { PageTitle } from "./components/PageTitle";
import { Col, Input, Row } from "reactstrap";
import { IOptionsProps, Select } from "./components/Select";

interface ITarefa {
  descricao: string;
  id: number;
  nome: string;
  status: number;
  usuarioId?: number;
  usuario: IUsuario;
}
interface IUsuario {
  id: number;
  nome: string;
  codigo: string;
  email: string;
}
const App: React.FC = () => {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [usuario, setUsuario] = useState<any[]>([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<ITarefa>(
    {} as ITarefa
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const listarTarefas = async function listarTarefas() {
    const dados: AxiosResponse<ITarefa[]> = await axios.get(
      "https://localhost:7067/api/Tarefa/Listar"
    );
    setTarefas(dados.data);
    console.log(dados.data);
  };
  const listarUsuarios = async function listarUsuarios() {
    const dados: AxiosResponse<IUsuario[]> = await axios.get(
      "https://localhost:7067/api/Usuario/Listar"
    );
    setUsuarios(dados.data);
    setUsuario(
      dados.data.map((x) => {
        return {
          id: x.id,
          label: x.nome,
        };
      })
    );
  };
  const handleSubmit = async (): Promise<void> => {
    try {
      //await getData();
    } catch (ex) {}
  };
  useEffect(() => {
    listarUsuarios();
  }, []);
  return (
    <>
      <Row>
        <PageTitle title={"Cadastro de tarefa"} md={"7"}></PageTitle>
        <Col md="5">
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
                text="Excluir"
                iconCheck="fa-trash"
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
        }}
      />

      <Table
        columns={[
          { title: "Nome", field: "nome" },
          { title: "Descrição", field: "descricao" },
          {
            title: "Usuário",
            field: "usuarioId",
            render: (x) => {
              return usuarios.find((y) => y.id === x.usuarioId)?.nome || "";
            },
          },
          { title: "Status", field: "status" },
        ]}
        data={tarefas}
        selectionMode="single"
        onSelectionChange={(e) => {
          console.log(e);
          e.length > 0
            ? setTarefaSelecionada(e[0])
            : setTarefaSelecionada({} as ITarefa);
        }}
      />

      <Modal isOpen={modalOpen} className="modal-lg">
        <HeaderModal
          toggle={() => {
            setModalOpen(!modalOpen);
          }}
        >
          Cadastro de nova tarefa
        </HeaderModal>
        <form onSubmit={handleSubmit}>
          <BodyModal>
            <Row>
              <Col md="4">
                <Input
                  value={tarefaSelecionada.nome}
                  type="text"
                  onChange={(e) =>
                    setTarefaSelecionada({
                      ...tarefaSelecionada,
                      nome: e.target.value,
                    })
                  }
                  placeholder="Nome:"
                />
              </Col>
              <Col md="4">
                <Select
                  id={""}
                  name={""}
                  options={[
                    { label: "Selecione um usuario", id: 1, selected: true },
                  ]}
                />
              </Col>
              <Col md="4">
                <Select
                  id={""}
                  name={""}
                  options={[
                    { label: "Selecione um status", id: 1, selected: true },
                  ]}
                />
              </Col>
              <textarea
                value={tarefaSelecionada.descricao}
                style={{
                  marginTop: "20px",
                  height: "80px",
                  borderRadius: "5px",
                  backgroundColor: "#fff",
                  border: "1px solid #dee2e6",
                }}
                maxLength={1000}
                onChange={(e) =>
                  setTarefaSelecionada({
                    ...tarefaSelecionada,
                    descricao: e.target.value,
                  })
                }
                placeholder="Descrição:"
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

export default App;
