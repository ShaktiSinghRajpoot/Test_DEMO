function ConvertBase64ToPDF(Billid, Invnoprefix, _url) {
    $.ajax({
        url: _url,
        type: "POST",
        data: { Billno: Billid, Invnoprefix: Invnoprefix },
        success: function (data) {
            if (data == "0" || data == 0) {
                Command: toastr["error"]("IRN Code not generated !Please generate it & then print!")
            }
            else {
                var reportdata = data.formatType + data.fileBS64Data;
                var popupWinWidth = 1200;
                var popupWinHeight = 800;
                var left = (screen.width - popupWinWidth) / 2;
                var top = (screen.height - popupWinHeight) / 4;
                var pdfWindow = window.open("", "", 'resizable=yes, width=' + popupWinWidth + ', height=' + popupWinHeight + ', top=' + top + ', left=' + left);
                pdfWindow.document.write("<iframe frameborder='1' style='overflow: hidden; height: 99%;width: 99%;margin: 0 auto;' src='" + encodeURI(reportdata) + "'></iframe>");
            }
        },
        error: function (response) { },
        failure: function (response) { }
    });
}