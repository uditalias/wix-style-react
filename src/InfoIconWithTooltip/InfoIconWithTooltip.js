import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';

import Tooltip from '../Tooltip';
import {Info} from 'wix-style-react/Icons';
import Icon from '../Icons/dist/Icon';


/**
 * Info icon with tooltip
 *
 * This component is just a composit if Icon
 * and Tooltip components getting them work together.
 */
class InfoIconWithTooltip extends WixComponent {
  static displayName = 'InfoIconWithTooltip';

  static propTypes = {
    ...Tooltip.propTypes,
    iconSize: Icon.propTypes.size
  }

  static defaultProps = {
    ...Tooltip.defaultProps,
    iconSize: Icon.defaultProps.size
  }

  render() {
    const {iconSize, ...tooltipProps} = this.props;

    return (
      <Tooltip {...tooltipProps}>
        <span style={{display: 'inline-block'}}>
          <Info size={iconSize}/>
        </span>
      </Tooltip>
    );
  }
}

export default InfoIconWithTooltip;
