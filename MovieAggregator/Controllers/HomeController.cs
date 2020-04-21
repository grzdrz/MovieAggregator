using MovieAggregator.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace MovieAggregator.Controllers
{
    public class HomeController : Controller
    {
        public DBContextMoviesInfo db;

        public HomeController()
        {
            db = new DBContextMoviesInfo();
        }

        public ActionResult Index()
        {
            var cast = db.Casts.Include(p => p.Movie).ToList();

            Debug.WriteLine("Cast: ");
            foreach (var e in cast)
            {
                Debug.WriteLine("  " + e.FirstName);
            }

            return View();
        }
    }
}