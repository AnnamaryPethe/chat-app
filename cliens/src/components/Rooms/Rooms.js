import React from 'react';
import './Rooms.css'
import ScrollToBottom from "react-scroll-to-bottom";

const Rooms = ({rooms}) => (
    <div>
        <div className="roomsBox">
            <h3>Active rooms:</h3>
            <ScrollToBottom >
                {rooms.map((room, i) => <li key={i}> {room} </li>)}
            </ScrollToBottom>
        </div>
    </div>
);

export default Rooms;
