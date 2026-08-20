// The actual debouncing function

function debouncing(fn, delay){

    let timer;

    return function(...args){
        clearTimeout(timer);
        setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

// The function that you wanna run:

function sayHello(name){
    console.log(name);
}

// Wrap the function 

const debouncedHello = debouncing(sayHello, 400);

// Call the wrapped version NOT the original:
debouncedHello("A");
debouncedHello("B");




















