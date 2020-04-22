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
            #region "Movies"
            Movie movie1 = new Movie()
            {
                Name = "The Shawshank Redemption",
                Director = "Frank Darabont",
                Writer = "Stephen King",
                Description = "Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием, царящими по обе стороны решётки. Каждый, кто попадает в эти стены, становится их рабом до конца жизни. Но Энди, обладающий живым умом и доброй душой, находит подход как к заключённым, так и к охранникам, добиваясь их особого к себе расположения.",
                ReleaseDate = new DateTime(1994, 9, 10)
            };
            Movie movie2 = new Movie()
            {
                Name = "The Green Mile",
                Director = "Frank Darabont",
                Writer = "Frank Darabont",
                Description = "Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.",
                ReleaseDate = new DateTime(1999, 12, 6)
            };
            Movie movie3 = new Movie()
            {
                Name = "Schindler's List",
                Director = "Steven Spielberg",
                Writer = "Steven Zaillian",
                Description = "Фильм рассказывает реальную историю загадочного Оскара Шиндлера, члена нацистской партии, преуспевающего фабриканта, спасшего во время Второй мировой войны почти 1200 евреев.",
                ReleaseDate = new DateTime(1993, 10, 30)
            };
            Movie movie4 = new Movie()
            {
                Name = "Inception",
                Director = "Christopher Nolan",
                Writer = "Christopher Nolan",
                Description = "Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна, когда человеческий разум наиболее уязвим. Редкие способности Кобба сделали его ценным игроком в привычном к предательству мире промышленного шпионажа, но они же превратили его в извечного беглеца и лишили всего, что он когда-либо любил.\n" +
                              "\n" +
                              "И вот у Кобба появляется шанс исправить ошибки.Его последнее дело может вернуть все назад,\n" +
                              "но для этого ему нужно совершить невозможное — инициацию.Вместо идеальной кражи Кобб и его команда спецов должны будут провернуть обратное.Теперь их задача — не украсть идею,\n" +
                              "а внедрить ее.Если у них получится,\n" +
                              "это и станет идеальным преступлением.\n" +
                              "\n" +
                              "Но никакое планирование или мастерство не могут подготовить команду к встрече с опасным противником,\n" +
                              "который,\n" +
                              "кажется,\n" +
                              "предугадывает каждый их ход.Врагом,\n" +
                              "увидеть которого мог бы лишь Кобб.",
                ReleaseDate = new DateTime(2010, 7, 8)
            };
            Movie movie5 = new Movie()
            {
                Name = "The Lion King",
                Director = "Roger Allers",
                Writer = "Irene Mecchi",
                Description = "У величественного Короля-Льва Муфасы рождается наследник по имени Симба. Уже в детстве любознательный малыш становится жертвой интриг своего завистливого дяди Шрама, мечтающего о власти.\n" +
                              "\n" +
                              "Симба познаёт горе утраты,\n" +
                              "предательство и изгнание,\n" +
                              "но в конце концов обретает верных друзей и находит любимую.Закалённый испытаниями,\n" +
                              "он в нелёгкой борьбе отвоёвывает своё законное место в «Круге жизни»,\n" +
                              "осознав,\n" +
                              "что значит быть настоящим Королём.",
                ReleaseDate = new DateTime(1994, 5, 7)
            };
            #endregion

            #region "Cast"
            Actor cast1 = new Actor()
            {
                FirstName = "Morgan",
                SecondName = "Freeman",
                LastName = "",
                Movie = movie1
            };
            Actor cast2 = new Actor()
            {
                FirstName = "Tom",
                SecondName = "Hanks",
                LastName = "",
                Movie = movie2
            };
            Actor cast3 = new Actor()
            {
                FirstName = "Liam",
                SecondName = "Neeson",
                LastName = "",
                Movie = movie3
            };
            Actor cast4 = new Actor()
            {
                FirstName = "Leonardo",
                SecondName = "DiCaprio",
                LastName = "",
                Movie = movie4
            };
            Actor cast5 = new Actor()
            {
                FirstName = "Matthew",
                SecondName = "Broderick",
                LastName = "",
                Movie = movie5
            };
            #endregion

            db.Movies.Add(movie1);
            db.Movies.Add(movie2);
            db.Movies.Add(movie3);
            db.Movies.Add(movie4);
            db.Movies.Add(movie5);

            db.Cast.Add(cast1);
            db.Cast.Add(cast2);
            db.Cast.Add(cast3);
            db.Cast.Add(cast4);
            db.Cast.Add(cast5);

            db.SaveChanges();
            base.Seed(db);
        }
    }
}