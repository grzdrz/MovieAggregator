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
        public string Director { get; set; }
        public string Writer { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Description { get; set; }

        public string Genres { get; set; }
        public string Country { get; set; }

        public string ImgSrc { get; set; }


        public ICollection<Producer> Producers { get; set; }
        public ICollection<Actor> Cast { get; set; }

        public Movie()
        {
            Producers = new List<Producer>();
            Cast = new List<Actor>();
        }

    }
}