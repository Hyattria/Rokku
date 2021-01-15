import React, { useContext, useMemo } from 'react';

import RadioContext from './RadioContext';
import Checker from '../checkbox/Checker';

import { RadioProps } from './PropsType';
import { createNamespace } from '../utils';

const [bem] = createNamespace('radio');

const Radio: React.FC<RadioProps> & { Group?: React.FC } = (props) => {
  const { parent, ...context } = useContext(RadioContext);

  const checked = useMemo(() => {
    return parent ? context.checked === props.name : props.checked;
  }, [context.checked]);

  const toggle = () => {
    const emitter = parent ? context.toggle : () => {};
    emitter(props.name);
  };

  return (
    <Checker
      className={props.className}
      bem={bem}
      role="radio"
      parent={parent}
      checked={checked}
      onToggle={toggle}
      {...props}
    />
  );
};

export default Radio;
