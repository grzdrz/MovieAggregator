using Microsoft.AspNet.Identity.EntityFramework;

namespace MovieAggregator.Models.IdentityInfrastructure
{
    public class AppRole : IdentityRole
    {
        public AppRole() : base() { }

        public AppRole(string name)
            : base(name)
        { }
    }
}