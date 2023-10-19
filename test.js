// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDNmY2Q3MmIwN2VjNTY5ZWZjY2ZjMGIwYzZiODc4YyIsInN1YiI6IjY1MmMwYjRhMWYzZTYwMDBlMjkwOTBkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U5whOHRstQODVskBY8qrJgSSLGX6EhUU5hMdWyyHcYQ",
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
//     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDNmY2Q3MmIwN2VjNTY5ZWZjY2ZjMGIwYzZiODc4YyIsInN1YiI6IjY1MmMwYjRhMWYzZTYwMDBlMjkwOTBkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U5whOHRstQODVskBY8qrJgSSLGX6EhUU5hMdWyyHcYQ`,
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
      "X-RapidAPI-Key": "76a367ad41msh67c13acb7a32e3dp119d44jsnc42c6de349e4",
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
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