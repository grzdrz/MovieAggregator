using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieAggregator.Models
{
    public class Actor
    {
        public int Id { get; set; } 
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }

        public ICollection<Movie> Movies { get; set; }

        public Actor()
        {
            Movies = new List<Movie>();
        }

    }
}