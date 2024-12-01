import { getLoginPage, getRecipesByUser } from '../../controllers/index.ts'
import {RouteOptions} from 'fastify'

const dashboard: Array<RouteOptions> = [
    {
        method: 'GET',
        url: '/login/dashboard',
        handler: getLoginPage,
    },
    {
        method: 'GET',
        url: '/dashboard/recipes',
        handler: getRecipesByUser,
    },
];
export { dashboard }