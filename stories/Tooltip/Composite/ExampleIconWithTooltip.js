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
import HBox from '../../../HBox';

import styles from './Example.scss';

const px = x => `${x}px`;

class ExampleIconWithTooltip extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  state = {
    placement: 'top',
    text: 'Your full name will not be visible to other users',
    maxWidth: '',
    size: 24,
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
    const {size, placement, text, icon} = this.state;
    return (
      <HBox
        spacing={px(size / 2)}
        verticalAlignment={'center'}
        >
        <Input
          clearButton={false}
          errorMessage=""
          helpMessage=""
          id="firstName"
          maxLength={524288}
          placeholder="Type in your full name"
          roundInput={false}
          size="normal"
          textOverflow="clip"
          theme="normal"
          width=""
          withSelection={false}
          />
        <IconWithTooltip
          placement={placement}
          content={text}
          iconSize={size}
          icon={icon}
          />
      </HBox>
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
                <RadioGroup.Radio value={24}>{px(24)}</RadioGroup.Radio>
                <RadioGroup.Radio value={18}>{px(18)}</RadioGroup.Radio>
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
