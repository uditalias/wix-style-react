import React from 'react';
import {bool, node} from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Content from './Content';
import Header from './Header';
import LinkHeader from './LinkHeader';
import ButtonHeader from './ButtonHeader';
import CollapsedHeader from './CollapsedHeader';

import {stylable} from 'wix-react-tools';
import styles from './Card.st.css';

@stylable(styles)
export default class Card extends WixComponent {

  static Content = Content;
  static Header = Header;
  static LinkHeader = LinkHeader;
  static ButtonHeader = ButtonHeader;
  static CollapsedHeader = CollapsedHeader;

  static propTypes = {
    children: node,
    stretchVertically: bool
  };
  static defaultProps = {
    stretchVertically: false,
    collapsStyle: 'none'
  };

  render() {
    return (
      <div style-state={{stretchVertically: this.props.stretchVertically}}>
        {this.props.children}
      </div>
    );
  }
}
