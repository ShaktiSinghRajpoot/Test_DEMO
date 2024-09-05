var invoiceTable = [];
$(function () {
    $('[id*=invoiceUpload]').change(function () {
        var reader = new FileReader();
        //Reference the FileUpload element.
        var fileUpload = document.getElementById("invoiceUpload");
        var nametest = fileUpload.value.split(" ").join("").toLowerCase();
        nametest = nametest.replaceAll("(", "");
        nametest = nametest.replaceAll(")", "");
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(nametest)) {
            if (typeof (FileReader) != "undefined") {
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
                $('#invoiceUpload').val(null);
                reader = new FileReader();
            } else {
                Swal.fire("Error!", "This browser does not support HTML5.", "error");
            }
        } else {
            Swal.fire("Error", "Please upload a valid Excel file.", "error");
        }
    })
});
function ProcessExcel(data) {
    var excelIncorrectColumn = false;
    var excelIncorrectData = false;
    invoiceTable = []
    var duplicateInvNo = '';
    var duplicateInvNoInTable = '';
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];
    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    $.each(excelRows, function (index, element) {
        //Remove extra whitespace from JSON object keys
        Object.keys(element).forEach((key) => {
            var replacedKey = key.trim().replaceAll(/\s/g, '').split('.').join("");
            if (key !== replacedKey) {
                element[replacedKey] = element[key];
                delete element[key];
            }

            if (replacedKey.toLowerCase() == "sno" || replacedKey.toLowerCase() == "invoiceno" || replacedKey.toLowerCase() == "dated" || replacedKey.toLowerCase() == "duedate" || replacedKey.toLowerCase() == "amount" || replacedKey.toLowerCase() == "balance") {
            } else {
                excelIncorrectColumn = true;
                excelIncorrectData = true;
            }
        });

        if (!excelIncorrectColumn) {
            if (invoiceTable.filter((item) => item.InvNo == element.InvoiceNo).length > 0) {
                duplicateInvNo += element.InvoiceNo + ', ';
            }
            $("#dt_csInvoiceList tbody tr").each(function () {
                var currentRow = $(this);
                var col1_value = currentRow.find("td:eq(1)").text();
                if (col1_value.toLowerCase() === element.InvoiceNo.toLowerCase()) {
                    duplicateInvNoInTable += element.InvoiceNo + ', ';
                }
            });

            if (element.Dated.toString().length > 0 && element.Dated.toString().length == 11) {
                if (element.DueDate.toString().length > 0 && element.DueDate.toString().length == 11) {
                } else {
                    excelIncorrectData = true;
                }
            } else {
                excelIncorrectData = true;
            }
            if (!excelIncorrectData) {
                //insert data in invoice table array
                invoiceTable.push({ InvId: (invoiceTable.length + 1), InvNo: element.InvoiceNo, InvDate: element.Dated, InvDueDate: element.DueDate, InvAmount: element.Amount, InvBalance: element.Balance });
            }
        }
    });

    if (excelIncorrectColumn) {
        Swal.fire("Excel Invalid file", "Excel has invalid column name please use sample file.", "error");
    } else {
        if (excelIncorrectData) {
            Swal.fire("Excel Invalid Data", "Use date format as 15-Aug-2022 with format cell as Text.", "error");
        } else {
            if (duplicateInvNo != '') {
                var msg = "Excel sheet have Duplicate Invoice Number : " + duplicateInvNo;
                Swal.fire("Duplicate Invoice Number", msg, "error");
            }
            if (duplicateInvNoInTable != '') {
                Swal.fire("Already Exists Invoice Number's: " + duplicateInvNoInTable, msg, "error");
                var swalWithBootstrapButtons = Swal.mixin({
                    customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-danger mr-2" },
                    buttonsStyling: false
                });
                swalWithBootstrapButtons.fire({
                    title: "Invoice Number already exists : " + duplicateInvNoInTable,
                    text: "Do you want to Override Invoice details ",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, Override it!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true
                }).then(function (result) {
                    if (result.value) {
                        InvoicesUpload();
                    }
                });
            } else {
                InvoicesUpload();
            }
        }
    }
};