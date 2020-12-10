import React, { useMemo } from 'react';
import classnames from 'classnames';
import { addUnit, createNamespace, getSizeStyle } from '../utils';
import { LoadingProps } from './PropsType';

const [bem] = createNamespace('loading');

const SpinIcon: JSX.Element[] = [];
for (let i = 0; i < 12; i += 1) {
  SpinIcon.push(<i key={i} />);
}

const CircularIcon = (
  <svg className={classnames(bem('circular'))} viewBox="25 25 50 50">
    <circle cx="50" cy="50" r="20" fill="none" />
  </svg>
);

const Loading: React.FC<LoadingProps> = (props) => {
  const { className, type = 'circular', vertical, color, size, children, textSize } = props;

  const spinnerStyle = useMemo(
    () => ({
      color,
      ...getSizeStyle(size),
    }),
    [color, size],
  );

  const renderText = () => {
    if (children) {
      return (
        <span
          className={classnames(bem('text'))}
          style={{
            fontSize: addUnit(textSize),
          }}
        >
          {children}
        </span>
      );
    }
    return null;
  };

  return (
    <div className={classnames(className, bem([type, { vertical }]))}>
      <span className={classnames(bem('spinner', type))} style={spinnerStyle}>
        {type === 'spinner' ? SpinIcon : CircularIcon}
      </span>
      {renderText()}
    </div>
  );
};

export default Loading;
