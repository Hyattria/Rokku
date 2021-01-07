import React, { useMemo, MouseEvent } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Icon from '../icon';
import { TagProps } from './PropsType';
import { createNamespace } from '../utils';
import { BORDER_SURROUND } from '../utils/constant';

const [bem] = createNamespace('tag');

const Tag: React.FC<TagProps> = (props) => {
  const { show, type, mark, plain, round, size, closeable, hairline } = props;

  const onClose = (event: MouseEvent) => {
    event.stopPropagation();
    if (props.onClose) {
      props.onClose();
    }
  };

  const getStyle = useMemo(() => {
    if (props.plain) {
      return {
        color: props.textColor || props.color,
      };
    }
    return {
      color: props.textColor,
      background: props.color,
    };
  }, [props.textColor, props.color]);

  const classes = { mark, plain, round, hairline };

  if (size) {
    classes[size] = size;
  }

  const CloseIcon = closeable && (
    <Icon name="cross" className={classnames(bem('close'))} onClick={onClose} />
  );

  return (
    <CSSTransition classNames="rk-fade" in={show} timeout={50} unmountOnExit>
      <span
        style={{ ...getStyle, ...props.style }}
        className={classnames(
          bem([classes, type]),
          {
            [BORDER_SURROUND]: hairline,
          },
          props.className,
        )}
        onClick={() => {
          if (props.onClick) {
            props.onClick();
          }
        }}
      >
        {props.children}
        {CloseIcon}
      </span>
    </CSSTransition>
  );
};

Tag.defaultProps = {
  show: true,
  type: 'default',
};

export default Tag;
