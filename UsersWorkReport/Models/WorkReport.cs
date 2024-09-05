using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersWorkReport.Models
{
    public class WorkReport
    {
        public string WorkingDate { get; set; }
        public string ScreenName { get; set; }
        public string SideMenu { get; set; }
        public string Module { get; set; }
        public bool TestingStatus { get; set; }
        public string Comment { get; set; }
    }
}
