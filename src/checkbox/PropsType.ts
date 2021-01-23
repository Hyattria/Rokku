import type { MouseEvent } from 'react';
import { BaseTypeProps } from '../utils';

type Shape = 'round' | 'square';

export interface CheckBoxGroupProps extends BaseTypeProps {
  max?: number | string;
  disabledv?: boolean;
  iconSize?: number | string;
  direction?: string;
  checkedColor?: string;
  asyncChange?: string;
  initChecked?: (string | number)[];
  onChange?: (name: (string | number)[]) => void;
}

export interface CheckerProps<T> extends BaseTypeProps {
  name?: number | string;
  disabled?: boolean;
  iconSize?: number | string;
  checkedColor?: string;
  labelPosition?: string;
  labelDisabled?: boolean;
  shape?: Shape;
  role?: string;
  bem?: Function;
  parent?: { props: T };
  bindGroup?: boolean;
  checked?: boolean;
  asyncChange?: boolean;
  onToggle?: () => void;
  onClick?: (event: MouseEvent) => void;
}

export type CheckboxProps = CheckerProps<CheckBoxGroupProps>;
