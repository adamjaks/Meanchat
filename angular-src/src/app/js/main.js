document.addEventListener("DOMContentLoaded", function(e) {

    M.AutoInit();

    document.querySelector('.back').addEventListener('click', () => {
        window.history.back();
    }, false);

});