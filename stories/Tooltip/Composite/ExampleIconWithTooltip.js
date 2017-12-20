import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import keys from 'lodash/keys';

import IconWithTooltip from 'wix-style-react/IconWithTooltip';
import * as Icons from 'wix-style-react/Icons';

import RadioGroup from '../../../src/RadioGroup';
import Label from '../../../src/Label';
import Input from '../../../src/Input';
import Dropdown from '../../../Dropdown';

import styles from './Example.scss';

class ExampleIconWithTooltip extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  state = {
    placement: 'top',
    text: 'Popover appears on click',
    maxWidth: '',
    size: '20px',
    icon: 'Info'
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
      <IconWithTooltip
        placement={this.state.placement}
        content={this.state.text}
        iconSize={this.state.size}
        icon={this.state.icon}
        />
    );
  }

  get iconOptions() {
    return keys(Icons).map(className => ({
      id: className,
      value: className
    }));
  }

  render() {
    return (
      <form className={styles.form}>
        <div className={styles.input}>
          <div className={styles.option}>
            <Label>Icon</Label>
            <div className={styles.flex}>
              <Dropdown
                options={this.iconOptions}
                selectedId={this.state.icon}
                onSelect={({value}) => this.setState({icon: value})}
                />
            </div>
          </div>

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

export default ExampleIconWithTooltip;
