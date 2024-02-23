import React, { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { Table } from "./components/Table";
import axios, { AxiosResponse } from "axios";

interface ITarefa {
  descricao: string;
  id: number;
  nome: string;
  status: number;
}
const App: React.FC = () => {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const listar = async function fetchTarefas() {
    const dados: AxiosResponse<ITarefa[]> = await axios.get(
      "https://localhost:7067/api/Tarefa/Listar"
    );
    setTarefas(dados.data);
    console.log(dados.data);
  };

  return (
    <>
      <Button
        type={"secondary"}
        text="novo"
        iconCheck="fa-plus"
        eventOnClickButton={() => {
          listar();
        }}
      />

      <Table
        columns={[
          { title: "Nome", field: "nome" },
          { title: "Descrição", field: "descricao" },
          { title: "Usuário", field: "usuario" },
          { title: "Status", field: "status" },
        ]}
        data={tarefas}
      />
    </>
  );
};

export default App;
