import { RouteOptions } from 'fastify';
import { addRecipe, getRecipes, updateRecipe } from '../../controllers/index.ts'
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
        method: 'PATCH',
        url: '/api/recipes',
        handler: updateRecipe,
    },
    {
        method: 'HEAD',
        url: '/',
        handler: (req, res) => {return 'Roi'},
    },
    {
        method: 'GET',
        url: '/',
        handler: (req, res) => {return 'Roi'},
    }
];
export { recipes }