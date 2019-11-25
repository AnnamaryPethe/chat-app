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

const getAllRooms = () => {
    const rooms = new Set();
    for(const user of users) {
        rooms.add(user.room);
    }
    return rooms;
};

const getAllUsersInRoom = (room) => {
    const usersList = new Set();
    for (let user of users) {
        if(user.room === room) {
            usersList.add(user.name);
        }
    }
    return usersList;
};

module.exports = {addUser, removeUser, getUser, getUserInRoom, getAllRooms, getAllUsersInRoom};
