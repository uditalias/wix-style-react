import React, {Children} from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import {children, once, optional, any} from '../../src/Composite';
import CloseButton from './CloseButton';
import TextLabel from './TextLabel';
import ActionButton from './ActionButton';

import {stylable} from 'wix-react-tools';
import css from './Notification.st.css';

export const LOCAL_NOTIFICATION = 'local';
export const GLOBAL_NOTIFICATION = 'global';
export const STICKY_NOTIFICATION = 'sticky';
export const DEFAULT_TIMEOUT = 6000;

export const notificationTypeToPosition = {
  [LOCAL_NOTIFICATION]: 'absolute',
  [GLOBAL_NOTIFICATION]: 'relative',
  [STICKY_NOTIFICATION]: 'fixed'
};

const animationsTimeouts = {
  enter: 500,
  leave: 350
};

function FirstChild(props) {
  const childrenArray = Children.toArray(props.children);
  return childrenArray[0] || null;
}

function mapChildren(children) {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length === 3) {
    return {
      label: childrenArray[0],
      ctaButton: childrenArray[1],
      closeButton: childrenArray[2]
    };
  } else {
    return {
      label: childrenArray[0],
      closeButton: childrenArray[1]
    };
  }
}

@stylable(css)
export default class Notification extends WixComponent {
  static propTypes = {
    show: PropTypes.bool,
    theme: PropTypes.oneOf(['standard', 'error', 'success', 'warning', 'premium']),
    size: PropTypes.oneOf(['small', 'big']),
    type: PropTypes.oneOf([GLOBAL_NOTIFICATION, LOCAL_NOTIFICATION, STICKY_NOTIFICATION]),
    timeout: PropTypes.number,
    zIndex: PropTypes.number,
    onClose: PropTypes.func,
    children: children(once(TextLabel), any(/*ActionButton or CloseButton*/), optional(CloseButton))
  };

  static defaultProps = {
    theme: 'standard',
    size: 'small',
    type: GLOBAL_NOTIFICATION,
    onClose: null
  };

  static CloseButton = CloseButton;
  static TextLabel = TextLabel;
  static ActionButton = ActionButton;

  closeTimeout;

  constructor(props) {
    super(props);
    this.state = {
      hideByCloseClick: false,
      hideByTimer: false
    };

    this.startCloseTimer(props);
  }

  startCloseTimer({type, timeout}) {
    if (type !== GLOBAL_NOTIFICATION) {
      this.closeTimeout = setTimeout(() => {
        this.hideNotificationOnTimeout();
      }, timeout || DEFAULT_TIMEOUT);
    }
  }

  clearCloseTimeout() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  hideNotificationOnCloseClick() {
    this.setState({hideByCloseClick: true});
    setTimeout(() => {
      this.props.onClose && this.props.onClose('hide-by-close-click');
    }, animationsTimeouts.leave + 100);
  }

  hideNotificationOnTimeout() {
    this.setState({hideByTimer: true});
    setTimeout(() => {
      this.props.onClose && this.props.onClose('hide-by-timer');
    }, animationsTimeouts.leave + 100);
  }

  bypassCloseFlags() {
    this.setState({
      hideByCloseClick: false,
      hideByTimer: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.bypassCloseFlags();
      this.clearCloseTimeout();
      this.startCloseTimer(nextProps);
    }
  }

  componentWillUnmount() {
    this.clearCloseTimeout();
  }

  shouldShowNotification() {
    return this.props.show && !this.state.hideByCloseClick && !this.state.hideByTimer;
  }

  getWrapperClassNames() {
    const {
      type,
      theme,
      size,
    } = this.props;

    const position = notificationTypeToPosition[type];

    return `notificationWrapper ${theme}Theme ${size}Size ${position}Position`;
  }

  renderLabel(component) {
    return (
      <div key="label" className="labelWrapper">
        {component}
      </div>
    );
  }

  renderActionButton(component) {
    return (
      component ?
        <div key="cta" className="ctaButtonWrapper">
          {component}
        </div> :
        null
    );
  }

  renderCloseButton(component) {
    return (
      <div
        data-hook="notification-close-button"
        key="close"
        className="closeButtonWrapper"
        onClick={() => this.hideNotificationOnCloseClick()}
        >
        {component}
      </div>
    );
  }

  renderNotification() {
    const {
      zIndex,
      children
    } = this.props;

    const childrenComponents = mapChildren(children);

    return (
      <div
        data-hook="notification-wrapper"
        className={this.getWrapperClassNames()}
        style={{zIndex}}
        >
        <div className="contentWrapper">
          {this.renderLabel(childrenComponents.label)}
          {this.renderActionButton(childrenComponents.ctaButton)}
        </div>
        {this.renderCloseButton(childrenComponents.closeButton)}
      </div>
    );
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          component={FirstChild}
          transitionName={{
            enter: css.notificationAnimationEnter,
            enterActive: css.notificationAnimationEnterActive,
            leave: css.notificationAnimationLeave,
            leaveActive: css.notificationAnimationLeaveActive,
          }}
          transitionEnterTimeout={animationsTimeouts.enter}
          transitionLeaveTimeout={animationsTimeouts.leave}
          >
          {this.shouldShowNotification() ? this.renderNotification() : null}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
