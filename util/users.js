let users = [];

// get th joined user 
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);

    return user;
}

// get the current user 
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// get the leaved user 
function leavedUser(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// get room users 
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}




module.exports =

{
    userJoin,
    getCurrentUser,
    leavedUser,
    getRoomUsers
};