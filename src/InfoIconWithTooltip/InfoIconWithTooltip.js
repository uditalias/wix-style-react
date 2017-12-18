import _ from 'lodash';
import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';

import Tooltip from '../Tooltip';
import {Info} from 'wix-style-react/Icons';

const exposeApi = key => _.extend({}, Tooltip[key], Info[key]);

class InfoIconWithTooltip extends WixComponent {
  static displayName = 'InfoIconWithTooltip';

  static propTypes = exposeApi('propTypes');

  static defaultProps = exposeApi('defaultProps');

  render() {
    const propsTooltip = _.omit(this.props, _.keys(Info.propTypes));
    const propsInfo = _.omit(this.props, _.keys(Tooltip.propTypes));

    return (
      <Tooltip {...propsTooltip}>
        <span>
          <Info {...propsInfo}/>
        </span>
      </Tooltip>
    );
  }
}

export default InfoIconWithTooltip;
