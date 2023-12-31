"use client";
import MovieThumbnail from "./MovieThumbnail";

function MoviesCollection({ results, title }) {
  // console.log(results[0]?.description);
  return (
    <div className="flex flex-col space-y-2 my-10 px-8 max-w-[1400] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-[8px]">
        {results?.map((result) => (
          <MovieThumbnail key={result?.id} result={result} />
        ))}
      </div>
    </div>
  );
}
export default MoviesCollection;
