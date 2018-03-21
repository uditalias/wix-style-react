import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import InteractiveCodeExample from 'wix-storybook-utils/InteractiveCodeExample';

import ExampleStandard from './ExampleStandard';

storiesOf('4. Selection', module)
  .add('4.1 + AutocompleteComposite', () => {
    return (
      <div>
        <Markdown/>
        <InteractiveCodeExample title="Customize a <AutocompleteComposite/>">
          <ExampleStandard/>
        </InteractiveCodeExample>
      </div>
    );
  });
