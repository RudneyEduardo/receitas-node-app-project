import { RouteOptions } from 'fastify';
import { addRecipe, getRecipes } from '../../controllers/index.ts'
const recipes: Array<RouteOptions>  = [
    {
        method: 'GET',
        url: '/api/recipes',
        handler: getRecipes,
    },
    {
        method: 'POST',
        url: '/api/recipes',
        handler: addRecipe,
    },
    {
        method: 'HEAD',
        url: '/',
        handler: (req, res) => {return 'Roi'},
    }
];
export { recipes }