"use client";
import { useSession } from "next-auth/react";
import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import { SessionProvider } from "@/src/components/SessionProvider";
import Slider from "@/src/components/Slider";
import Brands from "@/src/components/Brands";
import MoviesCollection from "@/src/components/MoviesCollection";
import ShowsCollection from "@/src/components/ShowsCollection";
function Main({ Data }) {
  const { data: session } = useSession();
  // console.log(Data?.popularMovies);
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
            <ShowsCollection
              results={Data?.top_ratedShows}
              title="Top Rated Shows"
            />
            <MoviesCollection
              results={Data?.popularMovies}
              title="Popular Movies"
            />
            <ShowsCollection
              results={Data?.popularShows}
              title="Popular Shows"
            />

            {/* <MoviesCollection
              results={Data?.top_ratedMovies}
              title="Top Rated Movies"
            /> */}
          </main>
        )}
      </main>
    </SessionProvider>
  );
}

export default Main;
