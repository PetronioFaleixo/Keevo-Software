import React, { useEffect, useState } from "react";
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
import { Select } from "../components/Select";

interface ITarefa {
  descricao: string;
  id: number;
  nome: string;
  statusId: number;
  usuarioId?: number;
  usuario: IUsuario;
}
interface IUsuario {
  id: number;
  nome: string;
  codigo: string;
  email: string;
}
interface IStatus {
  id: number;
  codigo: string;
}
interface IFiltro {
  status: number;
  usuario?: number;
}
const TarefaPage: React.FC = () => {
  const [filtro, setFiltro] = useState<IFiltro>({} as IFiltro);
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [usuario, setUsuario] = useState<any[]>([]);
  const [statusModel, setStatusModel] = useState<IStatus[]>([]);
  const [status, setStatus] = useState<any[]>([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<ITarefa>(
    {} as ITarefa
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const listarTarefas = async function listarTarefas() {
    const dados: AxiosResponse<ITarefa[]> = await axios.get(
      "https://localhost:7067/api/Tarefa/Listar",
      {
        params: {
          status: filtro.status || null,
          usuario: filtro.usuario || null,
        },
      }
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
  const listarStatus = async function listarUsuarios() {
    const dados: AxiosResponse<IStatus[]> = await axios.get(
      "https://localhost:7067/api/Status/Listar"
    );
    setStatusModel(dados.data);
    setStatus(
      dados.data.map((x) => {
        return {
          id: x.id,
          label: x.codigo,
        };
      })
    );
  };
  const excluir = async function listarUsuarios() {
    try {
      await axios.delete("https://localhost:7067/api/Tarefa/Remove", {
        params: {
          id: tarefaSelecionada.id,
        },
      });
      listarTarefas();
      alert("Tarefa excluida com sucesso!");
    } catch (ex) {
      alert("Erro ao Excluir");
    }
  };
  const handleSubmit = async (): Promise<void> => {
    try {
      await axios.post<ITarefa>(
        "https://localhost:7067/api/Tarefa/Salvar",
        tarefaSelecionada
      );
      alert("Tarefa salva com sucesso!");
      listarTarefas();
    } catch (ex) {
      alert("Erro ao salvar");
    }
  };
  useEffect(() => {
    listarUsuarios();
    listarStatus();
  }, []);
  return (
    <>
      <Row>
        <PageTitle title={"Cadastro de Tarefa"} md={"7"}></PageTitle>
        <Col md="5">
          <Row>
            <Col md="4">
              <Button
                type={"keevo"}
                text="Novo"
                iconCheck="fa-plus"
                eventOnClickButton={() => {
                  setTarefaSelecionada({} as ITarefa);
                  setModalOpen(!modalOpen);
                }}
              />
            </Col>
            <Col md="4">
              <Button
                type={"keevo"}
                text="Editar"
                iconCheck="fa-edit"
                disabled={!tarefaSelecionada.id}
                eventOnClickButton={() => {
                  setModalOpen(!modalOpen);
                }}
              />
            </Col>
            <Col md="4">
              <Button
                type={"keevo"}
                text="Excluir"
                disabled={!tarefaSelecionada.id}
                iconCheck="fa-trash"
                eventOnClickButton={() => {
                  excluir();
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <Label>Selecione um Usuário:</Label>
          <Select
            id={"filtrotUsuario"}
            name={"filtrotUsuario"}
            value={filtro.usuario || []}
            options={[{ label: null, id: null, selected: true }, ...usuario]}
            onChange={(e) => {
              setFiltro({
                ...filtro,
                usuario: e.target.value as unknown as number,
              });
            }}
          />
        </Col>
        <Col md="3">
          <Label>Selecione um Status:</Label>
          <Select
            id={"filtroStatus"}
            name={"filtroStatus"}
            value={filtro.status || []}
            placeholder=""
            options={[{ label: null, id: null, selected: true }, ...status]}
            onChange={(e) => {
              setFiltro({
                ...filtro,
                status: e.target.value as unknown as number,
              });
            }}
          />
        </Col>
        <Col md="3">
          <Button
            type={"keevo"}
            text="Filtrar"
            iconCheck="fa-filter"
            eventOnClickButton={() => {
              listarTarefas();
            }}
          />
        </Col>
      </Row>
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
          {
            title: "Status",
            field: "statusId",
            render: (x) => {
              return statusModel.find((y) => y.id === x.statusId)?.codigo || "";
            },
          },
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
                <Label>Nome:</Label>
                <Input
                  value={tarefaSelecionada.nome}
                  required
                  type="text"
                  onChange={(e) =>
                    setTarefaSelecionada({
                      ...tarefaSelecionada,
                      nome: e.target.value,
                    })
                  }
                  maxLength={200}
                  placeholder="Nome:"
                />
              </Col>
              <Col md="4">
                <Label>Selecione um Usuário:</Label>
                <Select
                  id={"selectUsuario"}
                  name={"selectUsuario"}
                  value={tarefaSelecionada.usuarioId || []}
                  options={[
                    { label: null, id: null, selected: true },
                    ...usuario,
                  ]}
                  onChange={(e) => {
                    setTarefaSelecionada({
                      ...tarefaSelecionada,
                      usuarioId: e.target.value as unknown as number,
                    });
                  }}
                />
              </Col>
              <Col md="4">
                <Label>Selecione um Status:</Label>
                <Select
                  id={"selectStatus"}
                  name={"selectStatus"}
                  required
                  value={tarefaSelecionada.statusId || []}
                  options={[
                    { label: null, id: null, selected: true },
                    ...status,
                  ]}
                  onChange={(e) => {
                    setTarefaSelecionada({
                      ...tarefaSelecionada,
                      statusId: e.target.value as unknown as number,
                    });
                  }}
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
                required
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

export default TarefaPage;
