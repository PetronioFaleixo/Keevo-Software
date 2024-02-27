import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StatusPage from "../src/pages/StatusPage";
import TarefaPage from "../src/pages/TarefaPage";
import UsuarioPage from "../src/pages/UsuarioPage";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TarefaPage />} />
          <Route path="*" element={<TarefaPage />} />
          <Route path="/tarefa" element={<TarefaPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/usuario" element={<UsuarioPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
