import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import InfoIconWithTooltip from 'wix-style-react/InfoIconWithTooltip';

import RadioGroup from '../../../src/RadioGroup';
import Label from '../../../src/Label';
import Input from '../../../src/Input';

import styles from './Example.scss';

class ExampleInfoIconWithTooltip extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  state = {
    placement: 'top',
    text: 'Popover appears on click',
    maxWidth: '',
    size: '20px'
  };

  componentDidUpdate(props) {
    props.onChange(this.getExampleCode());
  }

  componentDidMount() {
    this.props.onChange(this.getExampleCode());
  }

  getExampleCode() {
    return reactElementToJSXString(this.renderExampleCode(), {
      showDefaultProps: false
    });
  }

  renderExampleCode() {
    return (
      <InfoIconWithTooltip
        placement={this.state.placement}
        content={this.state.text}
        iconSize={this.state.size}
        />
    );
  }

  render() {
    return (
      <form className={styles.form}>
        <div className={styles.input}>
          <div className={styles.option}>
            <Label>Icon size</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.size}
                onChange={size => this.setState({size})}
                >
                <RadioGroup.Radio value="20px">20px</RadioGroup.Radio>
                <RadioGroup.Radio value="3em">3em</RadioGroup.Radio>
                <RadioGroup.Radio value="10%">10%</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Placement</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.placement}
                onChange={placement => this.setState({placement})}
                >
                <RadioGroup.Radio value="top">Top</RadioGroup.Radio>
                <RadioGroup.Radio value="right">Right</RadioGroup.Radio>
                <RadioGroup.Radio value="bottom">Bottom</RadioGroup.Radio>
                <RadioGroup.Radio value="left">Left</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Text</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.text}
                onChange={e => this.setState({text: e.target.value})}
                />
            </div>
          </div>
        </div>

        <div className={styles.output}>
          <div className={styles.exampleWrapper}>
            <span>
              {this.renderExampleCode()}
            </span>
          </div>
        </div>
      </form>
    );
  }
}

export default ExampleInfoIconWithTooltip;
