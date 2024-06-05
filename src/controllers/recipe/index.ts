import { ObjectId } from "@fastify/mongodb";

const getRecipes = async function (req: any, reply: any) {
    const recipes = this.mongo.db.collection('recipes')
    const { username } = req.headers
    try {
        const recipesCursor = await recipes.find({ username })
        if ((await recipesCursor.count()) === 0) {
            return [];
        }
        return recipesCursor.toArray()
    } catch (err) {
        return err
    }
};



const addRecipe = async function (req: any, reply: any) {
    const recipes = this.mongo.db.collection('recipes')
    const { recipename, recipeimgpath, username } = req.headers

    try {
        return await recipes.insertOne({ recipename, recipeimgpath, username, 'usable': true });
    } catch (error) {
        return error
    }
};


const updateRecipe = async function (req: any, reply: any) {
    const recipes = this.mongo.db.collection('recipes')
    const { id, usable } = req.headers
    try {
       return recipes.updateOne({ _id: new ObjectId(id) }, { $set: { usable } })
    } catch (error) {
        return error
    }
    
}


export { addRecipe, getRecipes, updateRecipe }