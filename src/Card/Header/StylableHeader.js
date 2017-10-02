import React from 'react';
import {bool, node} from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';

import {stylable} from 'wix-react-tools';
import styles from './Header.st.css';

@stylable(styles)
export default class Header extends WixComponent {

  static propTypes = {
    title: node.isRequired,
    subtitle: node,
    withoutDivider: bool,
    suffix: node
  };

  static defaultProps = {
    subtitle: null,
    suffix: null,
    withoutDivider: false
  };

  render() {
    const {title, subtitle, withoutDivider, suffix} = this.props;

    const titleElement = (
      <div data-hook="title" className="title">
        {title}
      </div>
    );

    const subtitleElement = subtitle ? (
      <div data-hook="subtitle" className="subtitle">
        {subtitle}
      </div>
    ) : null;

    const suffixElement = suffix ? (
      <div data-hook="suffix">
        {suffix}
      </div>
    ) : null;

    return (
      <div style-state={{withDivider: !withoutDivider}}>
        <div className="container">
          {titleElement}
          {subtitleElement}
        </div>
        {suffixElement}
      </div>
    );
  }
}
