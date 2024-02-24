import React from "react";
import { Button } from "./Button";

export interface ITablePagination {
  paginaAtual: number;
  totalPaginas: number;
  onPageChange(paginaAtual: number): void;
}

const TablePagination: React.FC<ITablePagination> = ({
  paginaAtual,
  totalPaginas,
  onPageChange,
}) => {
  return (
    <div style={{ textAlign: "right", paddingBottom: "10px" }}>
      <span>
        Página {paginaAtual} de {totalPaginas}
      </span>
      <Button
        disabled={paginaAtual === 1}
        text=""
        type="secondary"
        iconCheck="fa-chevron-left"
        style={{ marginLeft: "5px", marginRigth: "10px" }}
        classes="m-l-10 m-r-10 w-auto btn-sm"
        eventOnClickButton={() => {
          onPageChange(paginaAtual - 1);
        }}
      />
      <Button
        disabled={paginaAtual >= totalPaginas}
        text=""
        type="secondary"
        iconCheck="fa-chevron-right"
        style={{ marginLeft: "5px", marginRigth: "10px" }}
        classes="m-l-5 m-r-10 w-auto btn-sm"
        eventOnClickButton={() => {
          onPageChange(paginaAtual + 1);
        }}
      />
    </div>
  );
};

export default TablePagination;
