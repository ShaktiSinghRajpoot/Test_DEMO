(function () {
    'use strict';
    window.addEventListener('load', function () {
        let forms = document.getElementsByClassName('needs-validation');
        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                if (form.checkValidity() === true) {
                    event.preventDefault();
                    event.stopPropagation();
                    SaveForm();
                }
            }, false);
        });
    }, false);
})();