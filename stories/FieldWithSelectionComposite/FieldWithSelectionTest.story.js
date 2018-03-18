import FieldWithSelectionTemplate from './FieldWithSelectionTemplate';
import storySettings from './StorySettings';

const story = {
  category: storySettings.kind,
  storyName: storySettings.testStoryName,
  component: FieldWithSelectionTemplate,
  componentPath: './FieldWithSelectionTemplate',
  componentProps: {
    selectionInput: 'checkbox',
    onChange: () => {}
  }
};
export default story;

