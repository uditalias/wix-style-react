import React, {Children} from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import WixComponent from '../../BaseComponents/WixComponent';
import styles from './InputAreaWithLabelComposite.scss';
import FieldLabelAttributes from '../../FieldLabelAttributes/FieldLabelAttributes';

class InputAreaWithLabelComposite extends WixComponent {
  render() {
    const {appendToParent, required, info, labelAttributesAlignment} = this.props;
    const children = Children.toArray(this.props.children);
    return (
      <div>
        { children.length === 2 ?
          (labelAttributesAlignment === 'right' ?
            <div className={styles.label}>
              {children[0]}
              { required || info ? <FieldLabelAttributes appendToParent={appendToParent} required={required} info={info} labelAttributesAlignment={labelAttributesAlignment}/> : null }
            </div> :
            <div className={styles.label}>
              { required || info ? <FieldLabelAttributes appendToParent={appendToParent} required={required} info={info} labelAttributesAlignment={labelAttributesAlignment}/> : null }
              {children[0]}
            </div>) :
            null
        }
        { last(children) }
      </div>
    );
  }
}

InputAreaWithLabelComposite.propTypes = {
  children: PropTypes.any,
  info: PropTypes.node,
  required: PropTypes.bool,
  labelAttributesAlignment: PropTypes.string,
  appendToParent: PropTypes.bool
};

InputAreaWithLabelComposite.defaultProps = {
  appendToParent: true
};

InputAreaWithLabelComposite.displayName = 'InputAreaWithLabelComposite';

export default InputAreaWithLabelComposite;
