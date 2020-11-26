//This is fooBar
var foo = "foo"

function bar(first, second) {
    this.localThis = first

    console.log(this.localThis * second)
}

new bar(2, 3)