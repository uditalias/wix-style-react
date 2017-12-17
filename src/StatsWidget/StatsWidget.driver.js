import React from 'react';
import ReactDOM from 'react-dom';
import dropdownDriverFactory from '../Dropdown/Dropdown.driver';
import headerDriverFactory from '../Card/Header/Header.driver';

const statsWidgetDriverFactory = ({element, wrapper, component}) => {
  const getAllStatistics = () => element.querySelector('[data-hook="stats-widget-content-wrapper"]');
  const getStatistic = index => getAllStatistics().childNodes[index];

  const driver = {
    exists: () => !!element,

    titleText: () => {
      const headerElement = element.querySelector(`[data-hook="stats-widget-title"]`);
      const headerDriver = headerDriverFactory({wrapper: element, element: headerElement});
      return headerDriver.title();
    },

    getStatisticTitle: index => getStatistic(index).querySelector('[data-hook="statistics-item-title"]').textContent,

    getStatisticSubTitle: index => getStatistic(index).querySelector('[data-hook="statistics-item-subtitle"]').textContent,

    getStatisticPercentValue: index => getStatistic(index).querySelector('[data-hook="percent-value"]').textContent,

    getStatisticPercentClass: index => getStatistic(index).querySelector('[data-hook="percent-wrapper"]').className,

    getFilterDriver: dataHook => {
      const dropdownElement = element.querySelector(`[data-hook="${dataHook}"]`);
      return dropdownDriverFactory({wrapper: element, element: dropdownElement});
    },

    doesLoaderExist: () => !!element.querySelector(`[data-hook="stats-widget-loader"]`),

    doesStatisticsExist: () => !!getAllStatistics(),

    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };

  return driver;
};

export default statsWidgetDriverFactory;
