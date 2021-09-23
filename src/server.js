const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const users = require('./api/users');
const NotesService = require('./services/postgres/NotesService');
const UserService = require('./services/postgres/UserService')
const NotesValidator = require('./validator/notes');
const UserValidator = require('./validator/users')
require('dotenv').config();

const init = async () => {
    const notesService = new NotesService();
    const userService = new UserService();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });
    await server.register([{
        plugin: notes,
        options: {
            service: notesService,
            validator: NotesValidator
        },
    }, {
        plugin: users,
        options: {
            service: userService,
            validator: UserValidator
        }
    }]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`,);
};

init();