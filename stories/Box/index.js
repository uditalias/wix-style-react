import story from 'story';

story({
  category: 'Core',
  componentSrcFolder: 'Box',
  componentProps: () => ({
    spacing: '0px',
    crossAxisAlignment: 'start',
    dataHook: 'storybook-box'
  })
});
