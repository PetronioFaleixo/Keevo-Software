/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import TablePagination from "./TablePagination";
import { Button } from "./Button";

interface ITableProps<T = any> {
  search?: boolean;
  rowsPerPage?: number;
  selectionMode?: "none" | "single" | "multiple";
  columns: ITableColumnProps<T>[];
  data: T[];
  onSelectionChange?: (selecteds: T[]) => void;
  onDoubleClick?: (clicked: T) => void;
  id?: string;
  selectAll?: boolean;
  defaultSelected?: T[];
  totalRegistros?: number;
  onPageChange?: (paginaAtual: number) => void;
}

export interface IMaterialData {
  title: string;
  field: string;
  id: string;
}

export interface ITableColumnProps<T = any> {
  title: string;
  field: string;
  width?: string;
  headerStyle?: React.CSSProperties;
  cellStyle?:
    | React.CSSProperties
    | ((data: T[], rowData: T) => React.CSSProperties);
  render?: (data: T, type: "row" | "group") => any;
}

export const Table: React.FC<ITableProps> = ({
  columns,
  data,
  search = true,
  rowsPerPage = 5,
  selectionMode = "none",
  onSelectionChange,
  onDoubleClick,
  selectAll,
  id,
  defaultSelected,
  totalRegistros,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selecionados, setSelecionados] = useState<any[]>([]);
  const [dados, setDados] = useState<any[]>([]);
  const obterValorObjeto = (row: any, field: string): string => {
    const properties = field.split(".");
    let retorno: any = row;
    properties.forEach((p) => {
      retorno = retorno[p];
    });

    if (retorno === 0) {
      return "0 ";
    }
    return retorno as string;
  };
  const searchValue = (propertyValue: string, array: any[]): any[] => {
    const newArray: any[] = [];
    if (propertyValue) {
      array.forEach((x) => {
        const existe = columns.some((p) => {
          return (
            obterValorObjeto(x, p.field) &&
            obterValorObjeto(x, p.field)
              .toString()
              .toUpperCase()
              .includes(propertyValue.toUpperCase())
          );
        });

        if (existe) {
          newArray.push(x);
        }
      });
    }
    return newArray;
  };

  useEffect(() => {
    setDados(data);
    setSelecionados([]);
    if (!onPageChange || data.length !== dados.length) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (selectionMode !== "none" && onSelectionChange) {
      onSelectionChange(selecionados);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selecionados, selectionMode]);
  useEffect(() => {
    if (defaultSelected) {
      setSelecionados(defaultSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSelected]);
  return (
    <>
      <div style={{ float: "right" }}>
        {selectAll && dados.length > 0 && (
          <Button
            type="white"
            text={
              selecionados.length < dados.length
                ? "Selecionar Todos"
                : "Remover Todos"
            }
            classes="w-auto m-r-20"
            iconCheck={
              selecionados.length < dados.length ? "fa-check" : "fa-times"
            }
            eventOnClickButton={() => {
              setSelecionados(selecionados.length < dados.length ? dados : []);
            }}
          />
        )}
        {search && (
          <input
            className="form-control form-control-sm"
            placeholder="Pesquisar..."
            style={{ width: "auto", margin: "7px 0", display: "inline" }}
            onChange={(e) => {
              if (e.target.value) {
                setDados(searchValue(e.target.value, data));
              } else {
                setDados(data);
              }
            }}
          />
        )}
      </div>
      <div style={{ overflowY: "auto", clear: "both", marginTop: "5px" }}>
        <table id={id} className="table-bordered table-hover">
          <thead style={{ background: "#EFEFEF" }}>
            <tr>
              {columns.map((x) => {
                return <th style={{ width: x.width || "auto" }}>{x.title}</th>;
              })}
            </tr>
          </thead>

          {!!dados.length && (
            <tbody style={{ whiteSpace: "nowrap" }}>
              {dados
                .slice(
                  totalRegistros || currentPage === 1
                    ? 0
                    : rowsPerPage * (currentPage - 1),
                  rowsPerPage * currentPage
                )
                .map((row) => {
                  return (
                    <tr
                      style={{
                        background: selecionados.find((i) => i === row)
                          ? "#CCC"
                          : "none",
                        cursor:
                          selectionMode !== "none" ? "pointer" : "default",
                      }}
                      onClick={() => {
                        if (selectionMode !== "none") {
                          if (selectionMode === "single") {
                            if (selecionados.length && selecionados[0] === row)
                              setSelecionados([]);
                            else setSelecionados([row]);
                          } else if (selecionados.find((i) => i === row))
                            setSelecionados([
                              ...selecionados.filter((s) => s !== row),
                            ]);
                          else setSelecionados([...selecionados, row]);
                        }
                      }}
                      onDoubleClick={() => {
                        if (onDoubleClick) {
                          onDoubleClick(row);
                          setSelecionados([]);
                        }
                      }}
                    >
                      {columns.map((c) => {
                        return (
                          <td>
                            {/* eslint-disable-next-line no-nested-ternary */}
                            {c.render
                              ? c.render(row, "row")
                              : obterValorObjeto(row, c.field)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          )}
          {!dados.length && (
            <tbody>
              <tr className="text-center">
                <td colSpan={columns.length}>Nenhum Registro Encontrado...</td>
              </tr>
            </tbody>
          )}
        </table>

        {dados.length > 0 && (
          <TablePagination
            paginaAtual={currentPage}
            totalPaginas={Math.ceil(
              (totalRegistros || dados.length) / rowsPerPage
            )}
            onPageChange={(paginaAtual: number): void => {
              setCurrentPage(paginaAtual);
              onPageChange && onPageChange(paginaAtual);
            }}
          />
        )}
      </div>
    </>
  );
};
