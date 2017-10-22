import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import RichTextAreaButton from './StylableRichTextAreaButton';
import RichTextAreaLinkButton from './StylableRichTextAreaLinkButton';

import {stylable} from 'wix-react-tools';
import styles from './RichTextAreaToolbar.st.css';

@stylable(styles)
export default class RichTextAreaToolbar extends WixComponent {
  static propTypes = {
    onClick: PropTypes.func,
    onLinkButtonClick: PropTypes.func,
    onImageButtonClick: PropTypes.func,
    hasMark: PropTypes.func.isRequired,
    hasListBlock: PropTypes.func.isRequired,
    hasLink: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    isSelectionExpanded: PropTypes.bool
  };

  render() {
    return (
      <div>
        {this.renderButton('mark', 'bold')}
        {this.renderButton('mark', 'italic')}
        {this.renderButton('mark', 'underline')}
        {this.renderLinkButton()}
        {this.renderButton('block', 'unordered-list')}
        {this.renderButton('block', 'ordered-list')}
        {this.props.onImageButtonClick ? this.renderImageButton() : null }
      </div>
    );
  }

  renderButton(action, type) {
    const {onClick, hasMark, hasListBlock, disabled} = this.props;
    const isActive = (action === 'mark') ? hasMark : hasListBlock;

    return (
      <div style-state={{disabled}} className="button">
        <RichTextAreaButton
          disabled={disabled}
          onClick={() => onClick(action, type)}
          type={type}
          isActive={isActive(type)}
          />
      </div>
    );
  }

  renderLinkButton() {
    const {onLinkButtonClick, hasLink, disabled, isSelectionExpanded} = this.props;

    return (
      <div style-state={{disabled}} className="button">
        <RichTextAreaLinkButton
          disabled={disabled}
          onClick={onLinkButtonClick}
          type="link"
          isActive={hasLink()}
          isSelectionExpanded={!isSelectionExpanded}
          />
      </div>
    );
  }

  renderImageButton() {
    const {onImageButtonClick, disabled} = this.props;

    return (
      <div style-state={{disabled}} className="button">
        <RichTextAreaButton
          disabled={disabled}
          onClick={onImageButtonClick}
          type="image"
          isActive={false}
          />
      </div>
    );
  }
}
