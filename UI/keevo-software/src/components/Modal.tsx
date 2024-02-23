import React from "react";
import {
  Modal as ModalReactStrap,
  ModalHeader as HeaderReactStrap,
  ModalBody as ModalBodyReactStrap,
  ModalFooter as ModalFooterReactStrap,
} from "reactstrap";

interface IModalProps {
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
}
export const Modal: React.FC<IModalProps> = ({
  isOpen = false,
  className,
  children,
}) => {
  return (
    <div>
      <ModalReactStrap isOpen={isOpen} className={className}>
        {children}
      </ModalReactStrap>
    </div>
  );
};

interface IHeaderProps {
  toggle?(): void;
  padding?: string;
  children: React.ReactNode;
}
export const HeaderModal: React.FC<IHeaderProps> = ({
  toggle,
  padding,
  children,
}) => {
  return (
    <HeaderReactStrap
      toggle={toggle}
      style={{
        padding: padding || "15px",
      }}
    >
      {children}
    </HeaderReactStrap>
  );
};

interface IBodyProps {
  classname?: string;
  children: React.ReactNode;
}
export const BodyModal: React.FC<IBodyProps> = ({ classname, children }) => {
  return (
    <ModalBodyReactStrap className={classname}>{children}</ModalBodyReactStrap>
  );
};

interface IFooterModalProps {
  classname?: string;
  children: React.ReactNode;
}
export const FooterModal: React.FC<IFooterModalProps> = ({
  classname,
  children,
}) => {
  return (
    <ModalFooterReactStrap className={classname}>
      {children}
    </ModalFooterReactStrap>
  );
};
