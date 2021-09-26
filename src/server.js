const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt')
const notes = require('./api/notes');
const users = require('./api/users');
const authentications = require('./api/authentications');
const NotesService = require('./services/postgres/NotesService');
const UserService = require('./services/postgres/UserService')
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const NotesValidator = require('./validator/notes');
const UserValidator = require('./validator/users');
const AuthenticationValidator = require('./validator/Authentications')
require('dotenv').config();

const init = async () => {
    const notesService = new NotesService();
    const userService = new UserService();
    const authenticationsService = new AuthenticationsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // server.auth.strategy('notesapp_jwt', 'jwt', {
    //     keys: process.env.ACCESS_TOKEN_KEY,
    //     verify: {
    //         aud: false,
    //         iss: false,
    //         sub: false,
    //         maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    //     },
    //     validate: (artifacts) => ({
    //         isValid: true,
    //         credentials: {
    //             id: artifacts.decoded.payload.id,
    //         },
    //     }),
    // });
    await server.register([
        { plugin: Jwt },
    ]);
    server.auth.strategy('notesapp_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    })

    await server.register([{
        plugin: notes,
        options: {
            service: notesService,
            validator: NotesValidator,
        },
    }, {
        plugin: users,
        options: {
            service: userService,
            validator: UserValidator
        }
    }, {
        plugin: authentications,
        options: {
            authenticationsService: authenticationsService,
            usersService: userService,
            tokenManager: TokenManager,
            validator: AuthenticationValidator
        }
    }
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();