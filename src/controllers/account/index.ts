
const getUser = async function (req: any, reply: any) {
    const users = this.mongo.db.collection('accounts')
    const { username } = req.headers
    console.log(username)
    const options = {
        projection: { _id: 0,  password: 1, username: 1 },
    };
    try {
        const user = await users.findOne({ username }, options)
        console.log(user)
        return user
    } catch (err) {
        return err
    }

};



const addUser = async function (req: any, reply: any) {
    const users = this.mongo.db.collection('accounts')
    
    const {username, password } = req.headers
    try {
        return await users.insertOne({username, password });
    } catch (error) {
        return error
    }
};


export { addUser, getUser }