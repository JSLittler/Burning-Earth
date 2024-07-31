import React from 'react'
import { useNavigate } from 'react-router-dom';

import { PAGES } from '../../constants';

import './styles.module.scss';

const PageHeader = ({}) => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div>
                <h1> Burning Earth <img src="./assets/favicon.png" alt="" className="logo"></img></h1>
            </div>
            <div className='greta'>
                <p >
                    "I want you to act as you would in a crisis. I want you to act as if our house is on fire. Because it is. - <strong>Greta Thunberg</strong>"
                </p>
                <div className='nav-container'>
                    <hr />
                    {Object.keys(PAGES).map((key, i) => <button key={`nav-button-${i}`} data-testid={`${PAGES[key].title}-button`} className="nav-button" type="submit" onClick={() => navigate(PAGES[key].path)}>{PAGES[key].title}</button>)}
                    <hr />
                </div>
            </div>
        </header>
    );
}

export default PageHeader;