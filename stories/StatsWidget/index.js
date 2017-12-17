import React from 'react';
import {storiesOf} from '@storybook/react';

import AutoDocs from 'wix-storybook-utils/AutoDocs';
import TabbedView from 'wix-storybook-utils/TabbedView';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import StatsWidgetSource from '!raw-loader!../../src/StatsWidget/StatsWidget';

import ExampleStatsWidgetStandard from './ExampleStatsWidgetStandard';
import ExampleStatsWidgetStandardRaw from '!raw-loader!./ExampleStatsWidgetStandard';

import ExampleStatsWidgetWithPercents from './ExampleStatsWidgetWithPercents';
import ExampleStatsWidgetWithPercentsRaw from '!raw-loader!./ExampleStatsWidgetWithPercents';

import ExampleStatsWidgetWithFilters from './ExampleStatsWidgetWithFilters';
import ExampleStatsWidgetWithFiltersRaw from '!raw-loader!./ExampleStatsWidgetWithFilters';

import ExampleStatsWidgetLoading from './ExampleStatsWidgetLoading';
import ExampleStatsWidgetLoadingRaw from '!raw-loader!./ExampleStatsWidgetLoading';

import ReadmeTestkit from '../../src/StatsWidget/README.TESTKIT.md';


storiesOf('Core', module)
  .add('Stats Widget', () => (
    <TabbedView tabs={['Usage', 'Testkit']}>
      <div>

        <AutoDocs source={StatsWidgetSource}/>

        <h1>Usage examples</h1>

        <CodeExample title="Stats widget" code={ExampleStatsWidgetStandardRaw}>
          <ExampleStatsWidgetStandard/>
        </CodeExample>
        <CodeExample title="Stats widget example with percents" code={ExampleStatsWidgetWithPercentsRaw}>
          <ExampleStatsWidgetWithPercents/>
        </CodeExample>
        <CodeExample title="Stats widget example with filters" code={ExampleStatsWidgetWithFiltersRaw}>
          <ExampleStatsWidgetWithFilters/>
        </CodeExample>
        <CodeExample title="Stats widget example loading state" code={ExampleStatsWidgetLoadingRaw}>
          <ExampleStatsWidgetLoading/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestkit}/>
    </TabbedView>
  ));
