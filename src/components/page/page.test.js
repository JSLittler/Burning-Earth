import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Page from './page';

const testChildElement = <div>Test Child Element</div>;

describe('<Page />', () => {
    it('renders pageHeader', () => {
        const { getByText } = render(
            <BrowserRouter><Page></Page></BrowserRouter>
        );
        
        const pageHeader = getByText('Burning Earth');

        expect(pageHeader).toBeInTheDocument();
    });

    it('renders children', () => {
        const { getByText } = render(
            <BrowserRouter><Page>{testChildElement}</Page></BrowserRouter>
        );

        const renderedChildElement = getByText('Test Child Element');

        expect(renderedChildElement).toBeInTheDocument();
    });
});