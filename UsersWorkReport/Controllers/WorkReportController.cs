using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersWorkReport.Models;
using UsersWorkReport.Services;

namespace UsersWorkReport.Controllers
{
    public class WorkReportController : Controller
    {
        private readonly IWorkReportServices _WorkReportServices;
        public WorkReportController(IWorkReportServices WorkReportServices)
        {
            _WorkReportServices = WorkReportServices;
        }
        public IActionResult WorkReport()
        {
            //List<WorkReport> workReportsList= _WorkReportServices.GetWorkReport();
            return View();
        }

        public JsonResult GetWorkReport()
        {
            List<WorkReport> workReportsList = _WorkReportServices.GetWorkReport();
            return Json(workReportsList);
        }
    }
}
