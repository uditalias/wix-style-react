import React, {Component} from 'react';
import {node} from 'prop-types';

import {stylable} from 'wix-react-tools';
import styles from './Content.st.css';

@stylable(styles)
export default class Content extends Component {

  static propTypes = {
    children: node
  };

  render() {
    return (
      <div className={styles.content}>
        {this.props.children}
      </div>
    );
  }
}
