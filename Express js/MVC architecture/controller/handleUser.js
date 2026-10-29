import { userData } from "../model/userData.js";

export function handleUser(req, res){
    res.render("user", {user: userData()})
}