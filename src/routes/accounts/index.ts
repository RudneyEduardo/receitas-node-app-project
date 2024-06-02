import { addUser, getUser } from '../../controllers/index.ts'
import {RouteOptions} from 'fastify'

const accounts: Array<RouteOptions> = [
    {
        method: 'GET',
        url: '/api/account',
        handler: getUser,
    },
    {
        method: 'POST',
        url: '/api/account',
        handler: addUser,
    }
];
export { accounts }