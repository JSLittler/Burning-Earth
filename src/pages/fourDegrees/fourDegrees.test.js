import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import FourDegress from './fourDegress';

describe('<FourDegrees />', () => {
    it('renders page, warming table, chart and source', () => {
        const { getByTestId, getByC } = render(
            <BrowserRouter>
                <FourDegress />
            </BrowserRouter>
        );

        expect(getByTestId('page')).toBeInTheDocument();
        expect(getByTestId('image-container')).toBeInTheDocument();
        expect(getByTestId('fourDegrees-image')).toBeInTheDocument();
    });
});