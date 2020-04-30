using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using MovieAggregator.Models.IdentityInfrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace MovieAggregator.Controllers
{
    //[Authorize]
    public class AccountController : Controller
    {
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.returnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginViewModel details = null)
        {
            AppUser user = await UserManager.FindAsync(details.Name, details.Password);

            if (user == null)
            {
                ModelState.AddModelError("", "Некорректное имя или пароль.");
            }
            else
            {
                ClaimsIdentity ident = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);

                AuthManager.SignOut();
                AuthManager.SignIn(new AuthenticationProperties
                {
                    IsPersistent = false
                }, ident);
                //return Redirect(returnUrl);

                string role = "";
                var roles = UserManager.GetRoles(user.Id).ToList();
                if (roles.Contains("admin")) role = "admin";
                else role = "user";
                return Json(
                    new { isDataReceivedSuccessfully = true, userRole = role },
                    "application/json",
                    JsonRequestBehavior.AllowGet);
            }

            //return View(details);
            return Json(
                new { isDataReceivedSuccessfully = false} ,
                "application/json",
                JsonRequestBehavior.AllowGet);
        }

        private IAuthenticationManager AuthManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private AppUserManager UserManager
        {
            get
            {
                return HttpContext.GetOwinContext().GetUserManager<AppUserManager>();
            }
        }

        [Authorize]
        public ActionResult Logout()
        {
            AuthManager.SignOut();
            return RedirectToAction("Index", "Home");
        }

        public JsonResult GetClientRole()
        {
            AppUser user = UserManager.FindByName(HttpContext.User.Identity.Name);

            string role = "";
            if (user is null)
                role = "NA";
            else
            {
                var roles = UserManager.GetRoles(user.Id).ToList();
                if (roles.Contains("admin")) role = "admin";
                else role = "user";
            }
            return Json(
                new { isDataReceivedSuccessfully = true, role = role },
                "application/json",
                JsonRequestBehavior.AllowGet);
        }
    }
}