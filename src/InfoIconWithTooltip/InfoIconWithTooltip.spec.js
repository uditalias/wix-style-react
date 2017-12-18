import React from 'react';
import {createDriverFactory} from '../test-common';
import InfoIconWithTooltipDriver from './InfoIconWithTooltip.driver';
import InfoIconWithTooltip from './InfoIconWithTooltip';

function resolveIn(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, timeout);
  });
}

describe('InfoIconWithTooltip', () => {
  const createDriver = () =>
    createDriverFactory(InfoIconWithTooltipDriver)(
      <InfoIconWithTooltip {...{showDelay: 5, hideDelay: 5, content: 'Foo bar baz'}}/>
    );

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should be hidden by default', () => {
    const driver = createDriver();
    expect(driver.isShown()).toBeFalsy();
  });

  it('should show a tooltip once hovering', () => {
    const driver = createDriver();
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBeTruthy();
    });
  });

  it('should hide when mouse leaving', () => {
    const driver = createDriver();
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBeTruthy();
      driver.mouseLeave();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeFalsy();
      });
    });
  });

});
