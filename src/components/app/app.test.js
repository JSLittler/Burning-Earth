import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../redux/store';
import App from './app';

const mockDispatch = jest.fn();

describe('<App />', () => {
    it('renders app starting with home page', () => {
      const { getByText } = render(
        <Provider store={store}>
          <App dispatch={mockDispatch}/>
        </Provider>
      );

      expect(getByText('Burning Earth')).toBeInTheDocument();
      expect(getByText('Greta Thunberg')).toBeInTheDocument();
      expect(getByText('Future Warming')).toBeInTheDocument();
      expect(getByText('Select a country to see how much it is expected to warm up to the year 2100, with current climate policies in place.')).toBeInTheDocument();
      expect(getByText('source: https://climateanalytics.org/')).toBeInTheDocument();
    });

    it('dispatches an action to set warming data in state', () => {
      const { getByText } = render(
        <Provider store={store}>
          <App dispatch={mockDispatch}/>
        </Provider>
      );

      expect(mockDispatch).toHaveBeenCalled();
    });
});
