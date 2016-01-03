"use strict";

// These checks based on those in underscore.js: http://underscorejs.org/docs/underscore.html

// Make a CommonJS module out of the object
// Returns true if a module was successfully created
// NOTE: Important to pass in a reference to the `module` object from the caller's scope
// otherwise ModuleMaker would use the `module` object in its own scope
var makeCommonJS = ({ obj, moduleObj, name }) => {
    if (moduleObj && moduleObj.exports) {
        moduleObj.exports = obj;
        return true;
    }
    return false;
};

// Make an AMD module out of the object
// Returns true if a module was successfully created
var makeAMD =  ({ obj, moduleObj, name }) => {
    if (typeof define === 'function' && define.amd) {
        if (name) {
            define(name, [], function() {
                return obj;
            });
        } else {
            define([], function() {
                return obj;
            });
        }
        return true;
    }

    return false;
};

// Store the object as a global variable
// Returns true if a global variable was successfully created
// (only recommended if you cannot make an actual module)
var makeGlobal = ({ obj, name }) => {
    var globalObj = null;
    if (typeof global !== 'undefined') {
        globalObj = global;
    } else if (typeof window !== 'undefined') {
        globalObj = window;
    }

    if (globalObj && name) {
        globalObj[name] = obj;
        return true;
    }

    return false;
};

// Try to create both a CommonJS and an AMD module from the object
// If neither could be made, try to store it as a global variable
// Returns true if a module was successfully made by any means
// options:
// - obj: the object to make into a module
// - moduleObj: a reference to the caller's module object (just pass in the word module)
// - name: used for AMD (optional) and global objects (required)
var make = ({ obj, moduleObj, name }) => {
    var isCommonJSMade = makeCommonJS({
        obj, moduleObj, name
    });
    var isAMDMade = makeAMD({
        obj, moduleObj, name
    });

    var isModuleMade = isCommonJSMade || isAMDMade;

    // Only resort to making a global if you could not make a proper module
    if (!isModuleMade) {
        return makeGlobal({
            obj, name
        });
    }

    return isModuleMade;
};

var ModuleMaker = {
    make,
    makeCommonJS,
    makeAMD,
    makeGlobal
};

// Eat own dogfood:
// ModuleMaker uses its own methods to make itself into a module :)
var moduleObj;
try {
    moduleObj = module;
} catch (ex) {
    console.log("The module object is not defined. You are probably running this in a browser without Browserifying. Setting it to null in this case.");
    moduleObj = null;
} finally {
    ModuleMaker.make({
        obj: ModuleMaker,
        moduleObj: moduleObj,
        name: "ModuleMaker" // Important to specify name. Otherwise, this will override other anonymous AMD modules
    });
}