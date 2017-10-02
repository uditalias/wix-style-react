import React, {Children} from 'react';
import {any} from 'prop-types';
import WixComponent from '../../../src/BaseComponents/WixComponent';
import FieldLabelAttributes from '../../FieldLabelAttributes/FieldLabelAttributes';

import {stylable} from 'wix-react-tools';
import styles from './FieldWithSelectionComposite.st.css';

@stylable(styles)
export default class FieldWithSelectionComposite extends WixComponent {
  static propTypes = {
    children: any
  };

  static displayName = 'FieldWithSelectionComposite';

  constructor(props) {
    super(props);
    this._onTextInputFocus = this._onTextInputFocus.bind(this);
    this._onTextInputBlur = this._onTextInputBlur.bind(this);

    this.state = {
      textInputFocused: false,
    };
  }

  _getTextInput() {
    return (this.props.children.length === 3) ? this.props.children[1] : this.props.children[0];
  }

  _onTextInputFocus() {
    this.setState({textInputFocused: true});
  }

  _onTextInputBlur() {
    const textInput = this._getTextInput();
    textInput.props.onBlur && textInput.props.onBlur();
    this.setState({textInputFocused: false});
  }

  render() {
    const children = Children.toArray(this.props.children);
    const label = children.length === 3 ? (
      <div className="label">
        {children[0]}
        { this.props.required || this.props.info ? <FieldLabelAttributes required={this.props.required} info={this.props.info}/> : null }
      </div>) : null;
    const textInput = this._getTextInput();
    const selectionInput = label ? children[2] : children[1];
    const selectionInputType = selectionInput.type.name;
    let inputsWrapperClassName = 'inputs';
    if (selectionInputType) {
      inputsWrapperClassName += ` ${selectionInputType.toLowerCase()}`;
    }

    const inputsWrapperStyleState = {
      focused: this.state.textInputFocused,
      error: this.props.error,
      disabled: this.props.disabled
    };

    return (
      <div>
        {label}
        <div style-state={inputsWrapperStyleState} className={inputsWrapperClassName}>
          {React.cloneElement(textInput, {onFocus: this._onTextInputFocus, onBlur: this._onTextInputBlur, error: this.props.error, disabled: this.props.disabled, withSelection: true})}
          {React.cloneElement(selectionInput, {noBorder: true, noLeftBorderRadius: true, disabled: this.props.disabled})}
        </div>
      </div>
    );
  }
}
