function getme(arg_str) {
    if (arg_str[0] === '#') {
        return document.getElementById(arg_str.slice(1));
    }
};

