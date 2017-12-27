import React from 'react';
import {func, node, string} from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import ButtonLayout from '../../ButtonLayout/ButtonLayout';
import omit from 'omit';
import {isIcon} from '../ButtonLayout/themes';

import BOButton from 'wix-ui-backoffice/Button';
import ButtonIcon from 'wix-ui-backoffice/ButtonIcon';

class Button extends WixComponent {
  static propTypes = {
    ...ButtonLayout.propTypes,
    children: node,
    id: string,
    prefixIcon: node,
    suffixIcon: node,
    type: string,
    onClick: func,
    onMouseEnter: func,
    onMouseLeave: func
  }

  static defaultProps = ButtonLayout.defaultProps;

  themesMapper = {
    transparent: 'transparentGrey',
    fullred: 'primaryError',
    fullpurple: 'primaryPremium',
    emptyred: 'secondaryError',
    emptybluesecondary: 'secondaryStandard',
    emptyblue: 'secondaryStandard',
    emptypurple: 'secondaryPremium',
    fullblue: 'primaryStandard',
    transparentblue: 'secondaryStandard',
    whiteblue: 'tertiaryStandard',
    whiteblueprimary: 'primaryWhite',
    whitebluesecondary: 'secondaryWhite',
    'icon-greybackground': 'tertiaryStandard',
    'icon-standard': 'primaryStandard',
    'icon-standardsecondary': 'secondaryStandard',
    'icon-white': 'primaryWhite',
    'icon-whitesecondary': 'secondaryWhite'
      //'fullgreen', // ***DEPRECATED***
      // 'emptygreen', // ***DEPRECATED***
  }

  render() {
    const {theme, children} = this.props;
    const skin = this.themesMapper[theme];
    if (!skin) {
      throw `"${theme}" - is not exist, check if it deprecated`;
    }
    const functionalityProps = omit(['children', 'theme'], this.props);

    return (
      isIcon(skin) ?
        <ButtonIcon {...functionalityProps} icon={children} skin={skin}/> :
        <BOButton {...functionalityProps} skin={skin}>{children}</BOButton>
    );
  }
}

Button.displayName = 'Button';

export default Button;
