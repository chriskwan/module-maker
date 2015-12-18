# module-maker
Make an ordinary JavaScript object into a superheroic module (CommonJS, AMD, or global)

## Installation

```
npm install module-maker --save
```

## Usage

```
// Some ordinary JavaScript object you want to share
var Greeter = {
    speak: function () {
        alert("Hello World!");
    }
};

// Make a module out of your object
// (it will try to make both CommonJS and AMD modules
// and fallback to making a global if neither of those work)

var moduleMaker = require("module-maker");
moduleMaker.make({
    obj: Greeter,
    moduleObj: module,
    name: "Greeter" // omit if you want to make an anonymous AMD module
});
```

## Other Available Methods

```
moduleMaker.makeCommonJS({
    obj: Greeter,
    moduleObj: module
});

moduleMaker.makeAMD({
    obj: Greeter,
    name: "Greeter" // omit if you want to make an anonymous AMD module
});

moduleMaker.makeGlobal({
    obj: Greeter,
    name: "Greeter"
});
```
