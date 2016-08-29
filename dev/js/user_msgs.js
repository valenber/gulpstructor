function output_msg(msg_text, parent_id) {
    var target = getme('#' + parent_id + ' p.notification');
    target.innerHTML = msg_text;
    target.classList.remove('visible');
    setTimeout(function() {
        target.innerHTML = '&nbsp';
        target.classList.add('visible');
    }, 1500);
}