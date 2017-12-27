import React from 'react';
import {any, bool, oneOf} from 'prop-types';
import classNames from 'classnames';
import styles from './ButtonLayout.scss';
import {themes} from './themes';

const ButtonLayout = props => {
  const {theme, hover, active, disabled, height, children} = props;

  const className = classNames({
    [styles.button]: true,
    [styles[theme]]: true,
    [styles.hover]: hover,
    [styles.active]: active,
    [styles.disabled]: disabled,
    [styles[`height${height}`]]: height !== 'medium'
  }, children.props.className);

  const _style = Object.assign({},
    children.props.style,
    {
      height,
      display: 'inline-block'
    }
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(
      children,
      {className, style: _style},
      <div className={styles.inner}>
        {children.props.children}
      </div>
    );
  }
};

ButtonLayout.defaultProps = {
  height: 'medium',
  theme: 'fullblue'
};



ButtonLayout.propTypes = {
  active: bool,
  children: any,
  disabled: bool,
  height: oneOf(['small', 'medium', 'large']),
  hover: bool,
  theme: oneOf(themes)
};

ButtonLayout.displayName = 'ButtonLayout';

export default ButtonLayout;
