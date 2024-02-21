import React from 'react';

interface IIconProps {
  name: string;
  color?: string;
  fontSize?: number | string;
  style?: React.CSSProperties;
  title?: string;
  removeMarginRigth?: boolean;
}

export const Icon: React.FC<IIconProps> = ({
  name,
  color,
  fontSize,
  style,
  title,
  removeMarginRigth,
}) => {
  const classe = `fa ${name} ${removeMarginRigth ? '' : 'm-r-5'}`;
  return (
    <i title={title} className={classe} style={{ fontSize, color, ...style }} />
  );
};
