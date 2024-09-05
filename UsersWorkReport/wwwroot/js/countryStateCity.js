$(document).ready(function () {
    $('#Country').change(function () {
        let selectedValue = $(this).val();
        $('#State,#City').empty().append(new Option('Select', '', true, true));
        if (selectedValue != '') {
            BindState(selectedValue);
        }
    });
    $('#State').change(function () {
        $('#City').empty().append(new Option('Select', '', true, true));
        let countryCode = $('#Country').val();
        let selectedValue = $(this).val();
        if (countryCode != '' && selectedValue != '') {
            BindCity(countryCode, selectedValue);
        }
    });
});
function BindState(id) {
    $.post(baseUrl + '/Home/GetCountryState', { id: id }, function (data, status) {
        $.each(data, function (index, item) {
            $("#State").append($("<option></option>").val(item.value).html(item.text));
        });
    });
}
function BindCity(cCode, id) {
    $.post(baseUrl + '/Home/GetStateCity', { cCode: cCode, id: id }, function (data, status) {
        $.each(data, function (index, item) {
            $("#City").append($("<option></option>").val(item.value).html(item.text));
        });
    });
}