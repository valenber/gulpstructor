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