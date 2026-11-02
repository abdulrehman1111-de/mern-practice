import { users } from "../model/userData.js"

export function showUsers(req, res){
    res.render("users", {users: users})
}

export function showIndiviualUser(req, res){
    console.log(req.params.name)
    let userName = req.params.name

    res.render("user", {user: userName})
}










