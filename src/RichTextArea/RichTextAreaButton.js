import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '../Tooltip';
import Bold from './../Icons/dist/components/Bold';
import Italic from './../Icons/dist/components/Italic';
import Underline from './../Icons/dist/components/Underline';
import UnorderedList from './../Icons/dist/components/UnorderedList';
import OrderedList from './../Icons/dist/components/OrderedList';
import Link from './../Icons/dist/components/Link';
import Image from './../Icons/dist/components/Image';
import styles from './RichTextAreaButton.scss';
import {FocusableParts} from '../common/FocusableParts';

const buttons = {
  bold: {
    icon: Bold,
    tooltipText: 'Bold',
    size: 30
  },
  italic: {
    icon: Italic,
    tooltipText: 'Italic',
    size: 30
  },
  underline: {
    icon: Underline,
    tooltipText: 'Underline',
    size: 30
  },
  'unordered-list': {
    icon: UnorderedList,
    tooltipText: 'Bulletted list',
    size: 30
  },
  'ordered-list': {
    icon: OrderedList,
    tooltipText: 'Numbered list',
    size: 30
  },
  link: {
    icon: Link,
    tooltipText: 'Link',
    size: 30
  },
  image: {
    icon: Image,
    tooltipText: 'Image',
    size: 14
  }
};


class RichTextAreaButton extends Component {
  constructor(props) {
    super(props);
    this.focusableParts = new FocusableParts(this);
    this.state = {...this.focusableParts.getInitialState()};
  }

  handleMouseDown = event => {
    event.preventDefault();
    if (!this.props.disabled) {
      this.props.onClick();
    }
  };

  render() {
    const {type, isActive, isTooltipDisabled, disabled} = this.props;
    const tooltipContent = <p className={styles.tooltipContent}>{buttons[type].tooltipText}</p>;
    const className = classNames(styles.button, {
      [styles.isActive]: isActive,
      [styles.disabled]: disabled
    });
    return (
      <Tooltip
        appendToParent
        content={tooltipContent}
        overlay=""
        theme="dark"
        alignment="center"
        moveBy={{x: 2, y: 2}}
        hideDelay={0}
        disabled={isTooltipDisabled}
        >
        <button
          type="button"
          className={className}
          onMouseDown={this.handleMouseDown}
          data-hook={`rich-text-area-button-${type}`}
          {...this.focusableParts.getFocusStateAttribute()}
          {...this.focusableParts.getEventHandlers()}
          >
          <span className={styles.wrapper}>
            {this.renderIcon()}
          </span>
        </button>
      </Tooltip>
    );
  }

  renderIcon() {
    const {icon: Icon, size} = buttons[this.props.type];
    return <Icon size={`${size}px`}/>;
  }
}

RichTextAreaButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isTooltipDisabled: PropTypes.bool,
  disabled: PropTypes.bool
};

export default RichTextAreaButton;
