import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import "./Dashboard.css"
import video from '../../assets/background.mp4'

const Dashboard = () => {
    const [name, setName] = useState(" ");
    const [room, setRoom] = useState(" ");

    return (
        <div data-vide-bg="background">
            <div className="vid-container">
                <video id="background-video" loop autoPlay>
                    <source src={video} type="video/mp4"/>
                </video>
                <div className="joinContainer">
                    <h1>Come and join us to chat!!</h1>
                    <div className="joinInput">
                        <input placeholder="Nickname" type="text"
                               onChange={event => setName(event.target.value)}/>
                        <div className="joinInput">
                            <input placeholder="room name" type="text"
                                   onChange={event => setRoom(event.target.value)}/>
                        </div>
                        <div className="joinInput">
                            <Link onClick={event => (!name || !room ? event.preventDefault() : null)}
                                  to={`/chat?name=${name}&room=${room}`}>
                                <button type="submit">Join</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Dashboard;
