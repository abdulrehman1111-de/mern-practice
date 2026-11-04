import { usersData } from "../model/userData.js"

export function controlUser(req, res){
    res.render("users", {users: usersData})
}

export function controlIndiviualUser(req, res){
    let nameToFind = req.params.id
    let findIndiviualUser = usersData.find((item)=> item._id === nameToFind )
    res.render("user", {user: findIndiviualUser})
}





