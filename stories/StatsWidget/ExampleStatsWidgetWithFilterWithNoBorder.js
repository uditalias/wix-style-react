import React from 'react';
import StatsWidget from '../../src/StatsWidget';
import styles from './ExampleStatsWidget.scss';
import random from 'lodash/random';

const statistics = [{
  title: `$${random(10, 999)}`,
  subtitle: 'Revenue'
},
{
  title: `${random(1, 9)}`,
  subtitle: 'Products'
},
{
  title: `${random(1, 9)}`,
  subtitle: 'Transactions'
},
{
  title: `+$${random(1, 9)}`,
  subtitle: 'Profit'
}];

const dropdownOption = [{id: 1, value: 'Last week'}, {id: 2, value: 'This week'}];

export default () =>
  <div data-hook="card-example" className={styles.statsWidgetWrapper}>
    <StatsWidget title="Let's see what's going on with your store" statistics={statistics}>
      <StatsWidget.Filter selectedId={1} options={dropdownOption} noBorder/>
    </StatsWidget>
  </div>;
