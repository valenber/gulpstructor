var output = (function() {
    var modal = getme('#output_wrapper'),
        gulpfile,
        npm_command;
    
    function set_gulpfile(new_file) {
        var gulp_output = getme('#gulpfile_text');
        gulpfile = new_file;
        gulp_output.innerHTML = '<code><pre contenteditable="true">' + gulpfile + '</pre></code>';
        //remove spellchecker marks
        gulp_output.spellcheck = false;
        gulp_output.focus();
        gulp_output.blur();
    }
    
    function set_npm_command(new_string) {
        npm_command = new_string;
        getme('#npm_text').innerHTML = '<code>' + npm_command + '</code>';
        showModal();
    }
    
    function showModal() {
        modal.classList.add('visible');
        getme('body').style.overflowY = 'hidden';
    }
    
    function get_gulpfile() {
        return gulpfile;
    }
    
    function get_npm_command() {
        return npm_command;
    }
    
    //close_modal button functionality
    listen_to('#close_modal', 'click', hideModal);
    
    function hideModal() {
        modal.classList.remove('visible');
        getme('body').style.overflowY = 'auto';
    }
    
    //copy button functionality
    listen_to('#copy_gulpfile', 'click', clip_output);
    listen_to('#copy_npm', 'click', clip_output);
    
    function clip_output(e) {
        var target = e.target.dataset.target,
            clipboard = getme('textarea#clipboard'),
            target_output = '',
            text_sources = {
                gulp: '#gulpfile_text code pre',
                npm: '#npm_text code'
            };
        target_output = getme(text_sources[target]);
        if (target_output.innerHTML) {
            clipboard.innerHTML = target_output.innerHTML;
            clipboard.select();
            document.execCommand('copy');
            output_msg('Saved to your clipboard!', target);
        } else {
            output_msg('Error: ' + target + '_output contains no text', target);
        }
    }
    
    //downloading gulpfile
    listen_to('#download_gulpfile', 'click', download_file);

    function download_file() {
        var output_element = getme('#gulpfile_text code pre'),
            file_data = output_element.innerHTML;
        this.href = 'data:attachment/text,' + encodeURI(file_data);
    }
    
    //downloading project
    listen_to('#save_proj', 'click', download_project);
    
    function download_project() {
        var trigger = getme('#save_proj'),
            output_element = getme('#gulpfile_text code pre'),
            file_data = output_element.innerHTML;

        //create JSZip object from file structure object
        var proj = populate_JSZIP(fs_folders);
        
        function populate_JSZIP(fs_obj) {
            var new_zip = new JSZip(),
                fs = fs_obj;
            for (var i in fs) {
                for (var j in fs[i])
                    if (j !== 'root') {
                        new_zip.folder(fs[i].root).folder(fs[i][j]);
                    }                    
            }
            new_zip.file('Gulpfile.js', file_data);
            
            return new_zip;
        }
        
        //download zip-file
        proj.generateAsync({type:"blob"}) 
            .then(function (blob) {
            saveAs(blob, "project_folder.zip");
        });
    }
    
    return {
        get: {
            gulp: get_gulpfile,
            npm: get_npm_command
        },
        set: {
            gulp: set_gulpfile,
            npm: set_npm_command
        }
    };
})();
