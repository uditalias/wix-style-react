import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import Button from '../Button';
import Close from '../Icons/dist/components/Close';
import Check from '../Icons/dist/components/Check';
import Input from '../Input';

import {stylable} from 'wix-react-tools';
import styles from './RichTextAreaLinkForm.st.css';

@stylable(styles)
export default class RichTextAreaLinkForm extends Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    isTextInputVisible: PropTypes.bool,
  };

  state = {};

  getChangeHandler = field => ({target: {value}}) => {
    this.setState({[field]: value});
  };

  handleSubmit = event => {
    event.preventDefault();

    const {onSubmit} = this.props;
    onSubmit && onSubmit(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderTextInput()}
        <div className="input">
          <TextField>
            <Input
              onChange={this.getChangeHandler('href')}
              placeholder="URL this link should go to"
              size="small"
              />
          </TextField>
        </div>
        <div className="buttons">
          <span className="button">
            <Button theme="icon-standardsecondary" onClick={this.props.onCancel} height="small" type="button">
              <Close width="11" height="11"/>
            </Button>
          </span>
          <span className="button">
            <Button theme="icon-standard" height="small" type="submit" disabled={!this.state.href}>
              <Check width="10" height="12"/>
            </Button>
          </span>
        </div>
      </form>
    );
  }

  renderTextInput() {
    if (!this.props.isTextInputVisible) {
      return null;
    }

    return (
      <div className="input">
        <TextField>
          <Input
            onChange={this.getChangeHandler('text')}
            placeholder="Text to display"
            size="small"
            />
        </TextField>
      </div>
    );
  }
}
