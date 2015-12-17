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

// Get the Module Maker
var moduleMaker = require("module-maker");

// Make a module out of your object
// (it will try to make both CommonJS and AMD modules
// and fallback to making a global if neither of those work)
moduleMaker.make(Greeter, "Greeter"); // or moduleMaker.make(Greeter);
```

## Other Available Methods

```
moduleMaker.make(Greeter); // Will make an anonymous AMD module
moduleMaker.makeCommonJS(Greeter, "Greeter"); // or moduleMaker.makeCommonJS(Greeter);
moduleMaker.makeAmd(Greeter, "Greeter"); // or moduleMaker.makeAmd(Greeter);
moduleMaker.makeGlobal(Greeter, "Greeter");
```
