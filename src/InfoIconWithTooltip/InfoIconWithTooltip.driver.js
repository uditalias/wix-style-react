import ReactTestUtils from 'react-dom/test-utils';

export default ({element, wrapper}) => {
  const root = {
    $: query => (document.body.querySelector(query) || (wrapper.querySelector && wrapper.querySelector(query))),
    $$: query => {
      const documentResult = document.body.querySelectorAll(query);
      return documentResult.length > 0 ? documentResult : (wrapper.querySelectorAll && wrapper.querySelectorAll(query));
    }
  };

  return {
    isShown: () => !!root.$('.tooltip'),
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element)
  };
};

