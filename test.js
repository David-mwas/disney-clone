// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       `Bearer ${process.env.API_KEY}`,
//   },
// };

// fetch("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:  `Bearer ${process.env.API_KEY}`,
//     "Cache-Control": "no-cache",
//   },
// };

//   var Data = fetch(
//     "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));

// console.log(Data)

async function data() {
  const url = "https://imdb-top-100-movies.p.rapidapi.com/";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
      "Cache-Control": "no-store",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
data();
// const url = 'https://imdb-top-100-movies.p.rapidapi.com/premiummovies';
// const url = 'https://imdb-top-100-movies.p.rapidapi.com/top23';
