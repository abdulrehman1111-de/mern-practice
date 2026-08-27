// class Rectangle{
//     constructor(width, height){
//         this.width = width;
//         this.height = height;
//     }

//     area(){
//         return {
//             width: this.width,
//             height: this.height
//         }
//     }
// }

// let rectangle = new Rectangle(10, 20);
// const dimensions = rectangle.area();
// console.log(dimensions);


// class BankAccount{
//     balance = 0;

//     deposit(amount){
//         if(amount > 0){
//             this.balance += amount;
//         }
//     }

//     withdraw(amount){
//         if(this.balance > 0){
//             let remainingBalance = this.balance - amount;
//             console.log("Amount withdrawn");
//             return remainingBalance;
//         }
//         else{
//             console.log("Insufficient funds");
//         }
//     }
// }

// let bank = new BankAccount();
// bank.deposit(100);
// let withdrawnAmount = bank.withdraw(100);
// console.log(withdrawnAmount);


class Car{
    constructor(brand, speed = 0){
        this.brand = brand;
        this.speed = speed;
    }

    accelrate(amount){
        if(amount > 0){
            this.speed += amount;
        }
    }

    printSpeeds(){
        console.log(this.brand);
        console.log(this.speed);
    }
}

let car1 = new Car("Mehran");
car1.accelrate(100);
car1.printSpeeds();










































