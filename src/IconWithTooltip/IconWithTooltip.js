import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

import keys from 'lodash/keys';

import Tooltip from '../Tooltip';
import Icon from '../Icons/dist/Icon';
import * as Icons from 'wix-style-react/Icons';

/**
 * Icon with tooltip
 *
 * This component is just a composit if Icon
 * and Tooltip components getting them work together.
 */
class IconWithTooltip extends WixComponent {
  static displayName = 'IconWithTooltip';

  static propTypes = {
    ...Tooltip.propTypes,
    iconSize: Icon.propTypes.size,
    icon: PropTypes.oneOf(keys(Icons))
  }

  static defaultProps = {
    ...Tooltip.defaultProps,
    iconSize: Icon.defaultProps.size,
    icon: 'Info'
  }

  get iconClass() {
    return Icons[this.props.icon] || Icons[IconWithTooltip.defaultProps.icon];
  }

  render() {
    const {iconSize, ...tooltipProps} = this.props;

    return (
      <Tooltip {...tooltipProps}>
        <span style={{display: 'inline-block'}}>
          {React.createElement(this.iconClass, {size: iconSize}, null)}
        </span>
      </Tooltip>
    );
  }
}

export default IconWithTooltip;
