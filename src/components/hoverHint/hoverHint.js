import React from 'react';

import './styles.module.scss';

const hoverHint = ({ textContentPrimary, textContentSecondary }) => {
    return (
        <span className="hover-hint-icon"> &#9432;
            <div className="hover-hint" data-testid="hover-hint">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Information</strong></td>
                        </tr>
                        <tr>
                            <td>{textContentPrimary}</td>
                        </tr>
                        {textContentSecondary && <tr>
                            <td>{textContentSecondary}</td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </span>
    );
};

export default hoverHint;
