const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function checkDateRange(DateFrom, DateTo) {
    if (DateTo != '' && DateFrom != '') {
        var dateFrom = $('#' + DateFrom).val().split('-');
        var df = dateFrom[0];
        var mf = dateFrom[1];
        var yf = dateFrom[2];
        var newDateFrom = new Date(yf, monthNames.indexOf(mf), df);
        var dateTo = $('#' + DateTo).val().split('-');
        var dt = dateTo[0];
        var mt = dateTo[1];
        var yt = dateTo[2];
        var newDateTo = new Date(yt, monthNames.indexOf(mt), dt);

        //same date challenge
        if ((Date.parse(newDateTo) == Date.parse(newDateFrom))) {
            return false;
        }
        //end date greater than challenge
        if ((Date.parse(newDateTo) < Date.parse(newDateFrom))) {
            var _msg = "End date should be greater than Start date";
            toastr["info"](_msg, "Alert");
            $('#' + DateTo).val("");
        }
    }
}