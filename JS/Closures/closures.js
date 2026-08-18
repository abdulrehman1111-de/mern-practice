// function main(name){

//     function sayMyName(){
//         console.log(name);
//     }

//     return sayMyName;
// }

// let fn = main("Abdul");
// fn()
// fn()
// fn()

// console.log(fn);

function adder(num){

    function add(b){
        console.log(num + b);
    }

    return add;
}

const addTo5 = adder(5);
addTo5(2);
addTo5(10);









