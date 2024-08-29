import React from 'react';

import Page from '../../components/page/page';

import './styles.module.scss';

const FourDegress = ({}) => {

    return (
        <Page className="width">
            <div data-testid='image-container' className='image-container' autoFocus>
                <img data-testid='fourDegrees-image' src="./assets/4cImage.png"  alt="" className="infographic"></img>
            </div>
        </Page>
    );
};

export default FourDegress