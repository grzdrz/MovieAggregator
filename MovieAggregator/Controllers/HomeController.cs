using MovieAggregator.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using MovieAggregator.Models.IdentityInfrastructure;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;

namespace MovieAggregator.Controllers
{
    public class HomeController : Controller
    {
        public DBContextMoviesInfo db;

        public HomeController()
        {
            db = new DBContextMoviesInfo();
            db.Configuration.ProxyCreationEnabled = false;
        }

        public ActionResult Index()
        {
            var userName = User.Identity.Name;
            AppUser user = UserManager.FindByName(userName);
            if (user != null)
            {
                var roles = UserManager.GetRoles(user.Id).ToList();
                if (roles.Contains("admin"))
                {
                    ViewBag.UserRole = "Admin";
                    return View();
                }
            }
            ViewBag.UserRole = "notAdmin";
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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }




        private AppUserManager UserManager
        {
            get
            {
                return HttpContext.GetOwinContext().GetUserManager<AppUserManager>();
            }
        }

        [Authorize]
        public ActionResult Index1()
        {
            return View(GetData("Index1"));
        }

        [Authorize(Roles = "Users")]
        public ActionResult OtherAction()
        {
            return View("Index1", GetData("OtherAction"));
        }

        private Dictionary<string, object> GetData(string actionName)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();

            dict.Add("Action", actionName);
            dict.Add("Пользователь", HttpContext.User.Identity.Name);
            dict.Add("Аутентифицирован?", HttpContext.User.Identity.IsAuthenticated);
            dict.Add("Тип аутентификации", HttpContext.User.Identity.AuthenticationType);
            dict.Add("В роли Users?", HttpContext.User.IsInRole("Users"));

            return dict;
        }
    }
}