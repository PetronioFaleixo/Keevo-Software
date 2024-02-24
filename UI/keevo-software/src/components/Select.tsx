import { SelectHTMLAttributes, useState } from "react";

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  name: string;
  placeholder?: string;
  small?: boolean;
  options: IOptionsProps[];
  handleChange?(selected: any, idcFk?: any): void;
}

export interface IOptionsProps {
  id?: number | string;
  label: string;
  idcFk?: number;
  selected: boolean;
}

export const Select: React.FC<ISelectProps> = ({
  id,
  name,
  placeholder,
  options,
  small,
  handleChange,
  ...rest
}) => {
  const [selected, setSelected] = useState<string>();
  return (
    <div
      style={small ? { margin: 0 } : {}}
      className="form-group"
      data-live-search="true"
    >
      {placeholder && (
        <label
          htmlFor={id}
          style={{ fontSize: "12px", padding: "7px 0 1px 5px" }}
        >
          {placeholder}
        </label>
      )}
      <select
        className="form-control"
        id={id}
        name={name}
        onChange={(e) => {
          setSelected(e.target.value);
          handleChange &&
            handleChange(
              e.target.value,
              options.find((x) => x.id === e.target.value)?.idcFk
            );
        }}
        {...rest}
      >
        {options.map((x) => {
          return (
            <option value={x.id} selected={x.id === selected}>
              {x.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
