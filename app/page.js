
import Main from "@/src/components/Main";
import { data } from "@/dummydata/data";

async function fetchData() {
  const timestamp = new Date().getTime();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Cache-Control": "no-cache",
    },
  };
  const [
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&timestamp=${timestamp}`,
      options,
      { next: { revalidate: 1000 } }
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&timestamp=${timestamp}`,
      options
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&timestamp=${timestamp}`,
      options
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&timestamp=${timestamp}`,
      options
    ),
  ]);
  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);
  return {
    popularMovies: popularMovies.results,
    popularShows: popularShows.results,
    top_ratedMovies: top_ratedMovies.results,
    top_ratedShows: top_ratedShows.results,
    // revalidate: 0,
  };
}
async function Home() {
  let Data;
  try {
    const res = await fetchData();
    Data = res;
    // console.log(Data);
  } catch (error) {
    if (error) {
      Data = data;
    }
    console.error(`Error${error}`);
  }
  //
  // console.log(Data);
  return <Main Data={Data} />;
}

export default Home;
