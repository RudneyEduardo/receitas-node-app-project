
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



const addRecipe = async function async(req: any, reply: any) {
    const recipes = this.mongo.db.collection('recipes')
    const { recipename, recipeimgpath } = req.headers
    console.log("PATH: ", req.headers)
    try {
        return await recipes.insertOne({ recipename, recipeimgpath });
    } catch (error) {
        return error
    }
};



export { addRecipe, getRecipes }