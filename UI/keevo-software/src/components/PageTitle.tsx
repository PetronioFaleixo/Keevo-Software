import React from "react";
import { Col } from "reactstrap";

interface IPageTitle {
  title: string;
  subTitle?: string;
  md: string;
}

export const PageTitle: React.FC<IPageTitle> = ({ title, md }) => {
  return (
    <Col
      md={md}
      style={{
        marginBottom: "10px",
        color: "#2A004E",
        fontSize: "24px",
        fontFamily: "inherit",
        fontWeight: "500",
      }}
    >
      <h1>
        <strong>{title}</strong>
      </h1>
    </Col>
  );
};
