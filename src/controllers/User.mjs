
class UserController{
async getUser(req,res){
    const users= req.query.users;
    if(users){
        return res.status(200).send(`User ${users}`)
    }
    res.status(200).send("Users ")
}

async getUsersById(req,res){
    const id = req.params.id;
    res.status(200).send(`User #${id}`)
}

async addUser(req,res){
    res.status(201).send("User added")
}

async putUser(req,res){
    res.status(200).send("Users put")
}

async deleteUser(req,res){
    res.status(200).send("Users delete")
}

}

export default UserController;