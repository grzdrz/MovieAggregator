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
            var cast = db.Cast.Include(p => p.Movie).ToList();

            Debug.WriteLine("Cast: ");
            foreach (var e in cast)
            {
                Debug.WriteLine("  " + e.FirstName + " " + e.SecondName + " " + e.LastName + " and his movie:");
                Debug.WriteLine("    " + e.Movie.Name);
            }

            return View();
        }

        public JsonResult GetMoviesInfo()
        {
            IEnumerable<Movie> movies = db.Movies;

            return Json(movies, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMoviesInfoByPageNumber(int pageNumber = 1)
        {
            IEnumerable<Movie> movies = db.Movies.ToList();
            movies = movies.Skip((pageNumber - 1) * 4).Take(4).ToList();

            return Json(movies, JsonRequestBehavior.AllowGet);
        }

        public string GetMoviesCount()
        {
            int moviesCount = db.Movies.Count();

            return moviesCount.ToString();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}