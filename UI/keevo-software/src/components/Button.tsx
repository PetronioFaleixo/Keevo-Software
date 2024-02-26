import React from "react";
import { Button as ButtonReactStrap } from "reactstrap";
import { Icon } from "./Icon";

interface IButtonProps {
  id?: string;
  text?: string | JSX.Element;
  title?: string;
  type:
    | "keevo"
    | "edit"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "link"
    | "inverse"
    | "none"
    | "white";
  classes?: string;
  disabled?: boolean;
  visible?: boolean;
  iconCheck?: string;
  // eslint-disable-next-line
  eventOnClickButton?: React.MouseEventHandler<any>;
  // eslint-disable-next-line
  style?: React.CSSProperties | any;
}

export const Button: React.FC<IButtonProps> = ({
  id,
  text,
  type,
  title,
  classes,
  eventOnClickButton,
  disabled = false,
  visible = true,
  iconCheck,
  style,
}) => {
  const iconButton = iconCheck ? (
    <Icon name={iconCheck} removeMarginRigth={!text} />
  ) : (
    ""
  );

  if (type === "keevo") {
    return (
      <ButtonReactStrap
        id={id}
        className={classes}
        onClick={eventOnClickButton}
        title={title}
        style={{
          border: "1px solid #333",
          backgroundColor: "#6414D2",
          color: "#FFF",
          fontWeight: "bold",
          fontSize: "13px",
          borderRadius: "8px",
          padding: "10px 30px",
          marginTop: "25px",
        }}
        hidden={!visible}
        disabled={disabled}
      >
        {iconButton}
        {text}
      </ButtonReactStrap>
    );
  }

  if (type === "white") {
    return (
      <ButtonReactStrap
        id={id}
        className={classes}
        onClick={eventOnClickButton}
        title={title}
        style={{
          backgroundColor: "#EEE",
          border: "1px solid #333",
          color: "#333",
          fontWeight: "bold",
          fontSize: "13px",
        }}
        hidden={!visible}
        disabled={disabled}
      >
        {iconButton}
        {text}
      </ButtonReactStrap>
    );
  }
  return (
    <ButtonReactStrap
      id={id}
      onClick={eventOnClickButton}
      title={title}
      className={classes}
      style={style}
      color={type}
      disabled={disabled}
      hidden={!visible}
    >
      {iconButton}
      {text}
    </ButtonReactStrap>
  );
};
