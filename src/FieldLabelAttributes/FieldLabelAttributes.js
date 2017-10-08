import React from 'react';
import PropTypes from 'prop-types';
import styles from './FieldLabelAttributes.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Tooltip from '../Tooltip';
import Info2 from '../Icons/dist/components/Info2';
import classNames from 'classnames';

class FieldLabelAttributes extends WixComponent {

  render() {
    const styleAlignment = this.props.labelAttributesAlignment === 'right' ? styles.right : styles.left;
    const requiredAstrix = <span data-hook="required" className={classNames(styles.required, styleAlignment)}/>;
    const infoTooltip = (
      <Tooltip
        appendToParent={this.props.appendToParent}
        content={this.props.info}
        theme="light"
        alignment="center"
        moveBy={{x: 0, y: -1}}
        hideDelay={0}
        >
        <span data-hook="info" className={classNames(styles.icon, styleAlignment)}>
          <Info2 size="18px"/>
        </span>
      </Tooltip>
    );

    return (
      <div className={styles.root} data-hook="field-label-attributes">
        { this.props.required ? requiredAstrix : null }
        { this.props.info ? infoTooltip : null }
      </div>
    );
  }
}

FieldLabelAttributes.defaultProps = {
  required: false,
  info: '',
  appendToParent: true,
  labelAttributesAlignment: 'right'
};

FieldLabelAttributes.propTypes = {
  required: PropTypes.bool,
  info: PropTypes.node,
  appendToParent: PropTypes.bool,
  labelAttributesAlignment: PropTypes.string
};

export default FieldLabelAttributes;
