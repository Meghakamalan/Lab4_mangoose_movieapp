import "dotenv/config";
import express from "express";
import path from "path";

import db from "./components/pets/db.js"; //load db.js

const __dirname = import.meta.dirname;

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let movieList = await db.getMovies();
  //if there's nothing in the movie collection, initialize with some content then get the movies again
  if (!movieList.length) {
    await db.initializeMovies(); 
    movieList = await db.getMovies();
  }
  response.render("index", { movies: movieList });
});

app.get("/update", async (request, response) => {
  //update something
  await db.updateMovieRating("Titanic", "G");
  response.redirect("/");
});
app.get("/delete", async (request, response) => {
  await db.deleteMovieByRating("G");
  response.redirect("/");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

