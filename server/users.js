const users = [];


const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existUser = users.find(user => user === user.name && user === user.room);

    if (existUser) {
        return {error: "Username is taken."}
    }

    const user = { id, name, room};
    users.push(user);

    return { user }
};

const removeUser = (id) => {
    return users.filter(user => user.id === id)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => users.filter((user) => user.room === room);

const getAllRooms = (room) => {users.filter(room_ => room_.room === room)

};

module.exports = {addUser, removeUser, getUser, getUserInRoom, getAllRooms};
