"use client";
import dynamic from "next/dynamic";
import { movie } from "@/dummydata/singlemovie";
import "../../app/globals.css";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
// import ReactPlayer from "react-player";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/src/components/Header";
import { SessionProvider } from "@/src/components/SessionProvider";
import { useSession, getSession } from "next-auth/react";
import Hero from "@/src/components/Hero";
function Movie({ result, session }) {
  const ReactPlayer = dynamic(() => import("react-player/lazy"), {
    ssr: false,
  });
  // const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
    router.push(`/movie/${result.id}`);
  }, [session]);

  // const index = result?.videos?.results?.findIndex(
  //   (element) => element.type //=== "Clip"
  // );

  console.log(session);
  return (
    <SessionProvider session={session}>
      <div className="relative">
        <Header />
        {!session ? (
          <Hero />
        ) : (
          <section className="relative z-50 bg-[rgba(0,0,0,.2)]">
            <div className="min-h-[calc(100vh-72px)]  z-50 bg-[rgba(0,0,0,.6)] absolute top-0"></div>
            <div className="relative min-h-[calc(100vh-72px)]">
              <Image
                src={result?.image}
                // src={
                //   `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                //   `${BASE_URL}${result.poster_path}`
                // }

                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
            <div className="absolute inset-y-12 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {result.title || result.original_name}
              </h1>
              <div className="flex items-center space-x-3 md:space-x-5">
                <button className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]">
                  <img
                    src="/images/play-icon-black.svg"
                    alt=""
                    className="h-6 md:h-8"
                  />
                  <span className="uppercase font-medium tracking-wide">
                    Play
                  </span>
                </button>

                <button
                  className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                  onClick={() => setShowPlayer(true)}
                >
                  <img
                    src="/images/play-icon-white.svg"
                    alt=""
                    className="h-6 md:h-8"
                  />
                  <span className="uppercase font-medium tracking-wide">
                    Trailer
                  </span>
                </button>

                <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                  <PlusIcon className="h-6" />
                </div>

                <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                  <img src="/images/group-icon.svg" alt="" />
                </div>
              </div>

              <p className="text-sm md:text-sm">
                {result?.year || result.first_air_date} • {result?.genre}{" "}
                {result?.writers[0]}{" "}
                {/* {result.number_of_seasons === 1 ? "Season" : "Seasons"} •{" "}
                {result.genres.map((genre) => genre.name + " ")}{" "} */}
              </p>
              <h4 className="text-sm md:text-lg max-w-4xl">
                {result?.description}
              </h4>
            </div>

            {/* Bg Overlay */}

            {showPlayer && (
              <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
            )}
            <div
              className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
                showPlayer ? "opacity-100 z-50" : "opacity-0"
              }`}
            >
              <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
                <span className="font-semibold">Play Trailer</span>
                <div
                  className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                  onClick={() => setShowPlayer(false)}
                >
                  <XIcon className="h-5" />
                </div>
              </div>
              <div className="relative pt-[56.25%]">
                <ReactPlayer
                  // url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
                  url={result?.trailer}
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: "0", left: "0" }}
                  controls={true}
                  playing={showPlayer}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </SessionProvider>
  );
}

export default Movie;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  const { id } = context.query;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };
  // let data = {};
  // let request;
  // try {
  const request = await fetch(
    `https://imdb-top-100-movies.p.rapidapi.com/${id}`,
    options
  )
    .then((response) => response?.json())
    .catch((error) => console.error(`Error${error}`));
  // request = Data;
  // } catch (error) {
  //   if (error) {
  //     request = movie;
  //   }
  //   console.error(` Error ${error}`);
  // }

  return {
    props: {
      session,
      result: request,
    },
  };
}
