import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import TwoDegrees from './twoDegrees';

describe('<TwoDegrees />', () => {
    it('renders page, warming table, chart and source', () => {
        const { getByTestId, getByC } = render(
            <BrowserRouter>
                <TwoDegrees />
            </BrowserRouter>
        );

        expect(getByTestId('page')).toBeInTheDocument();
        expect(getByTestId('image-container')).toBeInTheDocument();
        expect(getByTestId('twoDegrees-image')).toBeInTheDocument();
    });
});
