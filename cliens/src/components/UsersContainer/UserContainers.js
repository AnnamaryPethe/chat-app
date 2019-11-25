import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './UsersContainer.css';

const UsersContainer = ({ names }) => (
    <div className="textContainer">
        {
            names
                ? (
                    <div>
                        <h1>People currently chatting:</h1>
                        <div className="activeContainer">
                            <h2>
                                {names.map((name, i) => (
                                    <div key={i} className="activeItem">
                                        {name}
                                        <img alt="Online Icon" src={onlineIcon}/>
                                    </div>
                                ))}
                            </h2>
                        </div>
                    </div>
                )
                : null
        }
    </div>
);

export default UsersContainer;
