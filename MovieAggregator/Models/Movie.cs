using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieAggregator.Models
{
    public class Movie
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }


        public string Director { get; set; }
        public string Writer { get; set; }


        public string Description { get; set; }


        public virtual IEnumerable<Cast> Cast { get; set; }
            
    }
}