const caller = require('./functionCaller');

const myVar = 100;

function test1() {
    const aa = 10;
    console.log(this);
}

const test2 = () => {
    const bb = 10;
    console.log(this);
};

// caller(test1);
// caller(test2);
test1();
test2();

console.log(this);