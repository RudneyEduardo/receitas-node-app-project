import { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs'
const getLoginPage = async function (req: FastifyRequest, reply: FastifyReply) {
    const loginPage = fs.createReadStream('./src/templates/login/index.html')
    reply.type('text/html')
    
    return loginPage
};


const getRecipesByUser = async function(req: any, reply: any){
    reply.type('text/html')
    return fs.createReadStream('./src/templates/dashboard/index.html')
}

export { getLoginPage , getRecipesByUser}