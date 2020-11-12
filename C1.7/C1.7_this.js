//this
function f() {
    console.log(this === window);
};

//f(); //true

//new f(); //false

const obj = {
    x: "success"
}

function foo() {
    console.log(this.x)
}

foo(); //undefined

foo.call(obj);