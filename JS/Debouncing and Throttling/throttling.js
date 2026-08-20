// The actual throttling function:
function throttle(fn, delay){

    let timer;

    return function(...args){
        // If a timer is already running, ignore this call
        if(timer) return;
        else{
            timer = setTimeout(() => {
                fn(...args);
                timer = null; // reset so the next call can make a new window
            }, delay);
        }
    }
}

// The function that you wanna run:
function sayHello(name){
    console.log(name);
}

// Wrapping the function:
const throttledHello = throttle(sayHello, 1000);

// Call the wrapped version
throttledHello("A");
throttledHello("B");












