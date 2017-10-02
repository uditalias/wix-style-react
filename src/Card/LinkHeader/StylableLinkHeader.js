import React from 'react';
import {bool, node, string} from 'prop-types';
import TextLink from '../../../src/Backoffice/TextLink';
import WixComponent from '../../../src/BaseComponents/WixComponent';

import {stylable} from 'wix-react-tools';
import styles from './LinkHeader.st.css';

@stylable(styles)
export default class LinkHeader extends WixComponent {

  static propTypes = {
    title: node.isRequired,
    linkTitle: string.isRequired,
    linkTo: string.isRequired,
    subtitle: node,
    tooltip: node,
    withoutDivider: bool
  };

  static defaultProps = {
    subtitle: null,
    tooltip: null,
    withoutDivider: false
  };

  render() {
    const {title, subtitle, linkTitle, linkTo, withoutDivider, tooltip} = this.props;

    const linkElement = (
      <div className="link">
        <TextLink dataHook="link" link={linkTo}>{linkTitle}</TextLink>
      </div>
    );

    const titleElement = (
      <div data-hook="title" className="title">
        {title}
      </div>
    );

    const tooltipElement = tooltip ? (
        React.cloneElement(tooltip, {}, linkElement)
      ) : null;

    const actionElement = tooltipElement ? tooltipElement : linkElement;

    const subtitleElement = subtitle ? (
      <div data-hook="subtitle" className="subtitle">
        {this.props.subtitle}
      </div>
    ) : null;

    return (
      <div style-state={{withDivider: !withoutDivider}} className={!subtitle ? 'headerOnlyTitle' : 'headerTitleSubtitle'}>
        <div>
          {titleElement}
          {subtitleElement}
        </div>
        {actionElement}
      </div>
    );
  }
}
