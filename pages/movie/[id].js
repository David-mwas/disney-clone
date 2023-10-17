"use client";
import "../../app/globals.css";
import Header from "@/src/components/Header";
import { SessionProvider } from "@/src/components/SessionProvider";
import { useSession, getSession } from "next-auth/react";
function Movie({ result, session }) {
  console.log(session);
  return (
    <SessionProvider>
      <div className="relative">
        <Header />
        <p className="text-red-500" >
          helloo
        </p>
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
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  ).then((response) => response.json());

  return {
    props: {
      session,
      result: request,
    },
  };
}
