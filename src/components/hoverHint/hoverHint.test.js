import React from 'react';
import { render } from '@testing-library/react';

import hoverHint from './hoverHint';

describe('hoverHint', () => {
    it('displays an icon', () => {
        const primaryText = "some primary text"
        const secondaryText = "some primary text"

        const { getByText } = render(
            hoverHint({ textContentPrimary: primaryText, textContentSecondary: secondaryText })
        );

        expect(getByText('ⓘ')).toBeInTheDocument();
    });

    it('does not display primary and secondary text by default', () => {
        const primaryText = "some primary text"
        const secondaryText = "some primary text"

        const { queryByTestId } = render(
            hoverHint({ textContentPrimary: primaryText, textContentSecondary: secondaryText })
        );
        
        expect(queryByTestId('hoverHint')).toBeNull();
    });
});