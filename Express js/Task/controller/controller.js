import { usersData } from "../model/userData.js"

export function showUsers(req, res){
    res.render("showUsers", {users: usersData})
}

export function showIndiviualUsers(req, res){
    const user = usersData.find(u => u._id === req.params.id);

    if(!user){
        return res.status(404).send("No user found");
    }

    res.render("showUser", { user });
}












