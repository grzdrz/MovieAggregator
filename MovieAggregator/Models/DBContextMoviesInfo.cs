using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MovieAggregator.Models
{
    public class DBContextMoviesInfo : DbContext
    {
        public DBContextMoviesInfo() : base("DBContextMoviesInfo")
        { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Cast { get; set; }
    }
}