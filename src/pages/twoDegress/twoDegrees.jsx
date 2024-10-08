import React from 'react';

import Page from '../../components/page/page';

import './styles.module.scss';

const TwoDegrees = ({}) => {
    return (
        <Page className="width">
            <div data-testid="image-container" className='image-container' autoFocus>
                <img data-testid="twoDegrees-image" src="./assets/consequences.jpg"  alt="" className="infographic"></img>
            </div>
        </Page>
    );
};

export default TwoDegrees;
