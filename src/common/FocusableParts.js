/**
 * A reusable focus state. (Without using HOC)
 *
 * Used to:
 *  - Add focus state to a ReactComponent's state.
 *  - Add onFocus/onBlur event handlers.
 *  - Add a data-focus attribute on the root DOM element.
 *
 */
export class FocusableParts {
    /**
     * Should be called at the constructor of a React Component, with `this` as an argument.
     */
  constructor(_reactInstance) {
    this._reactInstance = _reactInstance;
  }

    /**
     * Should be `...spreaded` into the initial state.
     */
  getInitialState = () => ({isFocused: false})

    /**
     * onFocus and onBlur event handlers.
     * Should be `...spreaded` into the element which we want to observe.
     */
  getEventHandlers = () => {
    const _inst = this._reactInstance;
    return {
      onFocus: () => {
        !_inst.state.isFocused && _inst.setState({isFocused: true});

      },
      onBlur: () =>
        _inst.state.isFocused && _inst.setState({isFocused: false})
    };
  }

    /**
     * Should be `...spreaded` into the DOM element whhere we want the focus state to reside.
     * Usually the root element of the component.
     */
  getFocusStateAttribute = () => {
    const _inst = this._reactInstance;
    return {
      'data-focused': _inst.state.isFocused
    };
  }
  }

