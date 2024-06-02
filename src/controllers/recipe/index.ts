
const getRecipes = async function (req: any, reply: any) {
    const recipes = this.mongo.db.collection('recipes')
    const { username } = req.header
    try {
        const recipesCursor = await recipes.find({ userName })
        if ((await recipesCursor.count()) === 0) {
           return [];
        }
        return recipesCursor.toArray()
    } catch (err) {
        return err
    }
};



const addRecipe = async function async (req: any, reply: any)  {
    const recipes = this.mongo.db.collection('recipes')
    const {recipeName, recipeImgPath} = req.header
    try {
        return await recipes.insertOne({recipeName, recipeImgPath});
    } catch (error) {
        return error
    }
};



export { addRecipe, getRecipes }