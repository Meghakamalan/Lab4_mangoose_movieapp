import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

//set up Schema and model
const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String
}); 
const Movie = mongoose.model("Movie", MovieSchema);

await mongoose.connect(dbUrl); //if there are user credentials (i.e. user/pwd) in the connection string, use await



//Function to initialize Movie collection with some sample data.
async function initializeMovies() {
  let movieArray = [
    {
      title:"Titanic",
      year:1997,
      rating:"PG-13"
    },
    {
      title:"Finding Nemo",
      year:2003,
      rating:"G"
    },
    {
      title:"The Karate Kid",
      year:2010,
      rating:"PG-13"
    }
  ];
  await Movie.insertMany(movieArray); //insert all data in moviearray
}

//Get all Movies from the movie collection
async function getMovies() {
  return await Movie.find({}); //return array for find all
}



//Function to update movies rating
async function updateMovieRating(title, newRating) {
  await Movie.updateOne(
    { title: String(title) },
    { $set: {rating: String(newRating)} }
  );

}

//function to delete movie
async function deleteMovieByRating(rating) {
  await Movie.deleteMany({ rating});
}


export default {
  initializeMovies,
  getMovies,
  updateMovieRating,
  deleteMovieByRating
}