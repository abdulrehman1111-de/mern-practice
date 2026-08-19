// const ageChecking = (age)=>{
//     return new Promise((resolve, reject)=>{
//         if(age > 18){
//             resolve("Promise resolved");
//         }
//         else{
//             reject("Promise rejected")
//         }
//     })
// }

// ageChecking(13)
// .then((e)=>{
//     console.log(e);
// })
// .catch((error)=>{
//     console.log(e);
// })

const checkBalance = (amount)=>{
    return new Promise((resolve, reject)=>{
        if (amount >= 5000){
            resolve("Promise resolved");
        }
        else{
            reject("Promise rejected");
        }
    })
}
checkBalance(4000)
.then((e)=>{
    console.log(e);
})
.catch((e)=>{
    console.log(e)
})




