// "use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import { SessionProvider } from "@/src/components/SessionProvider";
import Slider from "@/src/components/Slider";
import Brands from "@/src/components/Brands";
import MoviesCollection from "@/src/components/MoviesCollection";
import ShowsCollection from "@/src/components/ShowsCollection";
// import { PopularMoviesRes } from "@/dummydata/popularMovies";
// import { PopularShowsRes } from "@/dummydata/popularShows";

async function fetchData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };
  const [
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    ),
    fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      options
    ),
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    ),
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
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
  };
}
async function Home() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);
  const Data = await fetchData();

  return (
    <SessionProvider session={session}>
      <main className="">
        <Header />
        {!session ? (
          <Hero />
        ) : (
          <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-2]">
            <Slider />
            <Brands />
            <MoviesCollection
              results={Data.popularMovies}
              title="Popular Movies"
            />
            <ShowsCollection
              results={Data.popularShows}
              title="Popular Shows"
            />

            <MoviesCollection
              results={Data.top_ratedMovies}
              title="Top Rated Movies"
            />

            <ShowsCollection
              results={Data.top_ratedShows}
              title="Top Rated Shows"
            />
          </main>
        )}
      </main>
    </SessionProvider>
  );
}

export default Home;
