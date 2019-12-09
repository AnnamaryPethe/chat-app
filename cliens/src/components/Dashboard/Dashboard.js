import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./Dashboard.css"
import video from '../../assets/background.mp4'
import io from 'socket.io-client';
import Rooms from "../Rooms/Rooms";

let socket;

const Dashboard = () => {
    const [name, setName] = useState(" ");
    const [room, setRoom] = useState(" ");
    const [rooms, setRooms] = useState([]);
    const SERVER_PORT = "localhost:8000";

    useEffect(() => {
        socket = io(SERVER_PORT);

        socket.emit('rooms', {room});
        socket.on('roomArray', rooms => {
            setRooms(rooms);
        })
    }, [SERVER_PORT]);

    const handleJoin = event => {
        event.preventDefault();

        socket.emit('checkName', { name }, (error) => {
            if (error) {
                alert(error.error);
                return;
            }
            window.location.replace(`/chat?name=${name}&room=${room}`);
        });
    };

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
                            <Link onClick={handleJoin} to={""}>
                                <button type="submit">Join</button>
                            </Link>
                        </div>
                        <Rooms rooms={rooms}/>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Dashboard;
