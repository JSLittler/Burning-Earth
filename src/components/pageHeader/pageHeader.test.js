import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PageHeader from './pageHeader';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('<PageHeader />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders title', () => {
        const { getByText } = render(
            <BrowserRouter><PageHeader></PageHeader></BrowserRouter>
        );

        expect(getByText('Burning Earth')).toBeInTheDocument();
    });

    it('renders Greta Thunberg quote', () => {
        const { getByText } = render(
            <BrowserRouter><PageHeader></PageHeader></BrowserRouter>
        );
        
        expect(getByText(/I want you to act as you would in a crisis. I want you to act as if our house is on fire. Because it is./i)).toBeInTheDocument();
        expect(getByText(/Greta Thunber/)).toBeInTheDocument();
    });

    it('renders nav buttons', () => {
        const { getByTestId } = render(
            <BrowserRouter><PageHeader></PageHeader></BrowserRouter>
        );

        const homeButton = getByTestId('Home-button');
        const twoDegreesButton = getByTestId('Consequences: 2°C of Warming-button');
        const fourDegreesButton = getByTestId('Consequences: 4°C of Warming-button');

        expect(homeButton).toBeInTheDocument();
        expect(twoDegreesButton).toBeInTheDocument();
        expect(fourDegreesButton).toBeInTheDocument();
    });

    it('has functional home nav button', () => {
        const { getByTestId } = render(
            <BrowserRouter><PageHeader></PageHeader></BrowserRouter>
        );

        const homeButton = getByTestId('Home-button');
        homeButton.click();

        expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });

    it('has functional twoDegrees nav button', () => {
        const { getByTestId } = render(
            <BrowserRouter><PageHeader></PageHeader></BrowserRouter>
        );

        const twoDegreesButton = getByTestId('Consequences: 2°C of Warming-button');
        twoDegreesButton.click();

        expect(mockedUsedNavigate).toHaveBeenCalledWith('/twodegrees');
    });

    it('has functional fourDegrees nav button', () => {
        const { getByTestId } = render(
            <BrowserRouter><PageHeader></PageHeader></BrowserRouter>
        );
        
        const fourDegreesButton = getByTestId('Consequences: 4°C of Warming-button');
        fourDegreesButton.click();

        expect(mockedUsedNavigate).toHaveBeenCalledWith('/fourdegrees');
    });
});
