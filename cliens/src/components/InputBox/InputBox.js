import React from 'react';
import './InputBox.css'

const InputBox = ({ setMessage, sendMessage, message}) => (
    <from className="form">
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={event => setMessage(event.target.value)}
            onKeyPress={event => event.key ==='Enter' ? sendMessage(event) : null}/>
        <button className="sendButton info" onClick={event => sendMessage(event)}>Send</button>
    </from>
);

export default InputBox;
