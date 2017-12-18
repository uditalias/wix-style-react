import _ from 'lodash';
import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';

import Tooltip from '../Tooltip';
import {Info} from 'wix-style-react/Icons';
import Icon from '../Icons/dist/Icon';

const exposeApi = key => _.extend({}, Tooltip[key], {iconSize: Icon[key].size});

class InfoIconWithTooltip extends WixComponent {
  static displayName = 'InfoIconWithTooltip';

  static propTypes = exposeApi('propTypes');

  static defaultProps = exposeApi('defaultProps');

  render() {
    const tooltipProps = _.omit(this.props, ['iconSize']);
    const {iconSize} = this.props;

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
