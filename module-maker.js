// These checks based on those in underscore.js: http://underscorejs.org/docs/underscore.html

var makeCommonJS = function (obj, name) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = obj;
        return true;
    } else if (typeof exports !== 'undefined' && name) {
        exports[name] = obj;
        return true;
    }
    return false;
};

var makeAmd = function (obj, name) {
    if (typeof define === 'function' && define.amd) {
        define(name, [], function(){
            return obj;
        });
        return true;
    }
    return false;
};

var makeGlobal = function (obj, name) {
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

var make = function (obj, name) {
    var isCommonJSMade = makeCommonJS(obj, name);
    var isAmdMade = makeAmd(obj, name);

    var isModuleMade = isCommonJSMade || isAmdMade;

    // Only resort to making a global if you could not make a proper module
    if (!isModuleMade) {
        makeGlobal(obj, name);
    }
};

var ModuleMaker = {
    make: make,
    makeCommonJS: makeCommonJS,
    makeAmd: makeAmd,
    makeGlobal: makeGlobal
};

// Eat own dogfood
make(ModuleMaker);
