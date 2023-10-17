"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
function Header({ popularMovies }) {
  const { data: session } = useSession();
  // console.log(popularMovies);
  const router = useRouter();
  return (
    <SessionProvider>
      <header className="sticky bg-[#040714] top-0 z-[1000] flex h-[72px] items-center px-10 md:px-12 justify-between text-center py-2">
        <Image
          src="/images/logo.svg"
          width={80}
          height={80}
          alt="disney logo"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        {session && (
          <div className="hidden ml-10 md:flex items-center space-x-6">
            <a className="header-link group">
              <HomeIcon className="h-4" />
              <span className="span">Home</span>
            </a>
            <a className="header-link group">
              <SearchIcon className="h-4" />
              <span className="span">Search</span>
            </a>
            <a className="header-link group">
              <PlusIcon className="h-4" />
              <span className="span">Watchlist</span>
            </a>
            <a className="header-link group">
              <StarIcon className="h-4" />
              <span className="span">Originals</span>
            </a>
            <a className="header-link group">
              <img src="/images/movie-icon.svg" alt="" className="h-5" />
              <span className="span">Movies</span>
            </a>
            <a className="header-link group">
              <img src="/images/series-icon.svg" alt="" className="h-5" />
              <span className="span">Series</span>
            </a>
          </div>
        )}
        {!session ? (
          <button
            className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-500"
            onClick={signIn}
          >
            Login
          </button>
        ) : (
          <div
            className="flex flex-col   items-center justify-center mt-4 cursor-pointer shadow-md  shadow-sky-600  px-[8px] py-[2px] rounded-b-[20px] bg-[#040714]"
            onClick={() => signOut("google")}
          >
            <Image
              src={session?.user?.image}
              alt={`${session?.user?.name} image`}
              width={40}
              height={40}
              className=" rounded-full object-cover object-top "
            />

            <p className="text-[#fff] mt-[2px] text-center text-[8px] uppercase mb-2  bg-transparent tracking-widest ">
              {session?.user?.name}
            </p>
          </div>
        )}
      </header>
    </SessionProvider>
  );
}

export default Header;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {},
  };
}
