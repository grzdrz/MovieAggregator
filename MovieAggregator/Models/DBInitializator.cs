using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MovieAggregator.Models
{
    public class DBInitializator : DropCreateDatabaseAlways<DBContextMoviesInfo>
    {
        protected override void Seed(DBContextMoviesInfo db)
        {
            Movie movie1 = new Movie()
            {
                Name = "Movie1",
                Director = "Robert B. Weide",
                Writer = "SomeWriter1",
                Description = "this movie about blablabla...",
                ReleaseDate = DateTime.Now
            };
            Movie movie2 = new Movie()
            {
                Name = "Movie2",
                Director = "Robert B. Weide Jr.",
                Writer = "SomeWriter2",
                Description = "this movie about blablabla...2",
                ReleaseDate = DateTime.Now
            };
            Cast cast1 = new Cast()
            {
                FirstName = "Vasian",
                SecondName = "Vasianovich",
                LastName = "Pupkin",
                Movie = movie1
            };
            Cast cast2 = new Cast()
            {
                FirstName = "Robert",
                SecondName = "Robertovich",
                LastName = "Robertov",
                Movie = movie1
            };
            Cast cast3 = new Cast()
            {
                FirstName = "Actor",
                SecondName = "Actorovich",
                LastName = "Actorov",
                Movie = movie2
            };

            db.Movies.Add(movie1);
            db.Movies.Add(movie2);

            db.Casts.Add(cast1);
            db.Casts.Add(cast2);
            db.Casts.Add(cast3);

            db.SaveChanges();
            base.Seed(db);
        }
    }
}