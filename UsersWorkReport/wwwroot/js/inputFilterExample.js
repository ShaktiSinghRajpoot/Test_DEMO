// Install input filters.
// Integer
setInputFilter(document.getElementById("intTextBox"), function (value) {
    return /^-?\d*$/.test(value);
});
//Integer >= 0
setInputFilter(document.getElementById("uintTextBox"), function (value) {
    return /^\d*$/.test(value);
});
//Integer >= 0 and <= 500
setInputFilter(document.getElementById("intLimitTextBox"), function (value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500);
});
//Float (use . or , as decimal separator)
setInputFilter(document.getElementById("floatTextBox"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value);
});
//Currency (at most two decimal places)
setInputFilter(document.getElementById("currencyTextBox"), function (value) {
    return /^-?\d*[.,]?\d{0,2}$/.test(value);
});
//A-Z only
setInputFilter(document.getElementById("latinTextBox"), function (value) {
    return /^[a-z]*$/i.test(value);
});
//Hexadecimal
setInputFilter(document.getElementById("hexTextBox"), function (value) {
    return /^[0-9a-f]*$/i.test(value);
});