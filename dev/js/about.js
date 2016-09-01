//localStorage.setItem('no_about', true);

var about_ctrl = (function() {
    var about_block = getme('.about_wrapper');
    
    //hide about block if it's flaged as undesired in LS
    if (localStorage.getItem('no_about') === 'true') {
        about_block.style.display = 'none';
    }

    //on click, hide and mark as undesired
    listen_to('#no_about', 'click', do_not_show);
    
    function do_not_show() {
        about_block.style.display = 'none';
        localStorage.setItem('no_about', true);
    }
})();

//tst