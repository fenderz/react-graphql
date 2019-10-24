const cuid = require('cuid');

let users = [
  {
    id: '1',
    username: 'glnnrys',
    displayName: 'Rinat Khafiyatullin',
    bio:
        'Avito Front-End Engineer helping people build beautiful products through web technologies · React, GraphQL',
    email: 'glenn@glennreyes.com',
    photo: 'https://ca.slack-edge.com/T02D1A3NL-U0KD25A2E-84dd07d8e8f1-512',
    createdAt: new Date('January 2, 2019').toISOString(),
  },
  {
    id: '2',
    username: 'evgeniy',
    displayName: 'Evgeniy Fedyushkin',
    bio: `Avito Front-End Engineer`,
    email: 'esfedyushkin@avito.ru',
    photo: 'https://ca.slack-edge.com/T02D1A3NL-U4LJXR0JF-3a3552c11d67-512',
    createdAt: new Date('February 13, 2019').toISOString(),
  },
  {
    id: '3',
    username: 'oksana',
    displayName: 'Oksana Zenkova',
    bio: `Avito Front-End Engineer`,
    email: 'oazenkova@avito.ru',
    photo: 'https://ca.slack-edge.com/T02D1A3NL-UMFBB8ERH-ff1420155a5b-512',
    createdAt: new Date('February 14, 2019').toISOString(),
  },
];

const createUser = async user => {
  const newUser = { ...user, id: cuid(), createdAt: new Date().toISOString() };

  users = [...users, newUser];

  return newUser;
};
const updateUser = async user => {
  const userToUpdate = await getUserByUsername(user.username);
  if (!userToUpdate) {
    throw new Error(`User doesn't exist.`);
  }
  users = users.map(usr =>
      usr.username === user.username ? { ...usr, ...user } : usr,
  );

  return { ...userToUpdate, ...user };
};
const deleteUser = async user => {
  const userToDelete = await getUserById(user.id);
  if (!userToDelete) {
    throw new Error(`User doesn't exist.`);
  }

  users = users.filter(usr => usr.id !== user.id);

  return userToDelete;
};
const getAllUsers = async () => users;
const getUserById = async id => users.find(user => user.id === id);
const getUserByUsername = async username =>
    users.find(user => user.username === username);

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
