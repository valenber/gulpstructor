//DOM elements caching - shorthand
function getme(arg_str) {
    var result = document.querySelectorAll(arg_str);
    /*
    'querySelectorAll' always returns array, 
    so if there is only one match, return only the first element
    */
    if (result.length < 2) {
        return result[0];
    } else {
        return result;
    }
}

//Adding event listeners - shorthand
function add_ears(selector, event, handler) {
    var target = getme(selector);
    return target.addEventListener(event, handler || report_target);
}

//Default event handler - function
function report_target(e){      
    console.log('New event triggered on: ' + e.target);
}

//Checking if object is empty - function
function empty_obj(obj) {
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}