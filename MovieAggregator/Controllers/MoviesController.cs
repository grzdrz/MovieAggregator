﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MovieAggregator.Models;

namespace MovieAggregator.Controllers
{
    public class MoviesController : Controller
    {
        private DBContextMoviesInfo db = new DBContextMoviesInfo();

        //public async Task<ActionResult> Index()
        //{
        //    return View(await db.Movies.ToListAsync());
        //}

        public async Task<JsonResult> Details(int? id)
        {
            if (id == null)
            {
                return Json(new { isDataReceivedSuccessfully = false }, JsonRequestBehavior.AllowGet);
            }
            Movie movie = await db.Movies.FindAsync(id);
            if (movie == null)
            {
                return Json(new { isDataReceivedSuccessfully = false }, JsonRequestBehavior.AllowGet);
            }
            return Json(movie, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> Create(Movie movie)
        {
            if (ModelState.IsValid)
            {
                db.Movies.Add(movie);
                await db.SaveChangesAsync();
                return Json(new { isDataReceivedSuccessfully = true }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { isDataReceivedSuccessfully = false }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> Edit(Movie movie)
        {
            if (ModelState.IsValid)
            {
                db.Entry(movie).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return Json(new { isDataReceivedSuccessfully = true }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { isDataReceivedSuccessfully = false }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, ActionName("Delete")]
        public async Task<JsonResult> DeleteConfirmed(int id)
        {
            Movie movie = await db.Movies.FindAsync(id);
            db.Movies.Remove(movie);
            await db.SaveChangesAsync();
            return Json(new { isDataReceivedSuccessfully = true }, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
