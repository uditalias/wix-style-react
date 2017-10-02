import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

import {stylable} from 'wix-react-tools';
import styles from './Loader.st.css';

@stylable(styles)
export default class Loader extends WixComponent {
  static defaultProps = {
    size: 'medium',
    color: 'blue',
  };

  static propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
    color: PropTypes.oneOf(['blue', 'white']).isRequired,
    text: PropTypes.string
  };

  render() {
    const {size, color, text} = this.props;
    return (
      <div className={`${size} ${color}`}>
        <div className="wheel"/>
        { text && <div className="text">{text}</div> }
      </div>
    );
  }
}
