import { FastifyReply, FastifyRequest } from 'fastify';

const getUser = async function (req: any, reply: any) {
    const users = this.mongo.db.collection('accounts')
    const { username } = req.headers
    const options = {
        projection: { _id: 0, password: 1, username: 1 },
    };
    try {
        const user = await users.findOne({ username }, options)
        return user
    } catch (err) {
        return err
    }

};

const getRecipesByUser = async function (recipesCollection: any, username: string){
    
    try {
        const recipesCursor = await recipesCollection.find({ username })
        if ((await recipesCursor.count()) === 0) {
            return [];
        }
        return recipesCursor.toArray()
    } catch (err) {
        return err
    }
}

const getLoginUser = async function (req: FastifyRequest, reply: FastifyReply) {
    
    const users = this.mongo.db.collection('accounts')

    const { username, password } = req.body
    const options = {
        projection: { _id: 0, password: 1, username: 1 },
    };
    try {
        const user = await users.findOne({ username }, options)
        reply.type('text/html')
        if (password != user.password) {
            return '<h2>Senha e/ou Username Inválido(s)</h2>'
        }
        
        reply.setCookie('userCookie', username)
        const dataList = await getRecipesByUser(this.mongo.db.collection('recipes'),username);
        return `
            <html>
                <head>
                    <title>Dashboard</title>
                    
                </head>
                <body>
                    <h1>Bem-vindo à Dashboard!</h1>

                    
                    <h2>Lista de Exames e/ou Receituários:</h2>
                    <div class="user-list">
                        ${dataList.map((recipe: any) => `
                            <div class="user-item" onclick="openModal('${encodeURIComponent(recipe.recipeimgpath)}')">
                                ${recipe.recipename}
                            </div>
                            <div class="separator"></div> 
                        `).join('')}
                    </div>
                    <div id="myModal" class="modal">
                        <div class="modal-content">
                            <span class="close" onclick="closeModal()">&times;</span>
                            <img id="modalImage" src="" alt="Imagem do exame"/>
                        </div>
                    </div>

                    <script>
                        
                        function openModal(imageUrl) {
                            document.getElementById("modalImage").src = decodeURIComponent(imageUrl);
                            document.getElementById("myModal").style.display = "block";
                        }

                        
                        function closeModal() {
                            document.getElementById("myModal").style.display = "none";
                        }

                        
                        window.onclick = function(event) {
                            if (event.target == document.getElementById("myModal")) {
                                closeModal();
                            }
                        }
                    </script>
                </body>
            </html>
        `

    } catch (err) {
        return err
    }
}



const addUser = async function (req: any, reply: any) {
    const users = this.mongo.db.collection('accounts')

    const { username, password } = req.headers
    try {
        return await users.insertOne({ username, password });
    } catch (error) {
        return error
    }
};


export { addUser, getUser, getLoginUser }