import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import video from "../../assets/background2.mp4"
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import InputBox from "../InputBox/InputBox"

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:8000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        socket= io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message ]);
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    return(
        <div data-vide-bg="background2">
            <div className="vid-container">
                <video id="background-video" loop autoPlay >
                    <source src={video} type="video/mp4" />
                </video>
                <div className="outerContainer">
                    <div className="container">
                        <InfoBar room={room}/>
                        <Messages messages={messages} name={name}/>
                        <InputBox message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                    </div>
                </div>
                < script src="https://code.jquery.com/jquery-3.4.1.js"/>
                <script src="../../jquery.vide.js"/>
            </div>
        </div>
    )
};

export default Chat;
