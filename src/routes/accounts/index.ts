import { addUser, getUser, getLoginUser } from '../../controllers/index.ts'
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
    },
    {
        method: 'POST',
        url: '/api/login',
        handler: getLoginUser,
    }
];
export { accounts }