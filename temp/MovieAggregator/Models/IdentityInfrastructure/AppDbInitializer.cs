using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieAggregator.Models.IdentityInfrastructure
{
    public class AppDbInitializer : System.Data.Entity.DropCreateDatabaseAlways<AppIdentityDbContext>
    {
        protected override void Seed(AppIdentityDbContext context)
        {
            var userManager = new AppUserManager(new UserStore<AppUser>(context));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            // создаем две роли
            var role1 = new IdentityRole { Name = "admin" };
            var role2 = new IdentityRole { Name = "user" };

            // добавляем роли в бд
            roleManager.Create(role1);
            roleManager.Create(role2);

            // создаем пользователей
            var admin = new AppUser { Email = "qwerty", UserName = "qwerty" };
            string password = "qwerty";
            var result = userManager.Create(admin, password);

            // если создание пользователя прошло успешно
            if (result.Succeeded)
            {
                // добавляем для пользователя роль
                userManager.AddToRole(admin.Id, role1.Name);
                userManager.AddToRole(admin.Id, role2.Name);
            }

            base.Seed(context);
        }
    }
}