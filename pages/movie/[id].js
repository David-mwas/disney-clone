
function Movie({ result }) {
  console.log(result);
  return <div>[id] </div>;
}

export default Movie;
export async function getServerSideProps(context) {
  //   const session = await getSession(context);
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
      //   session,
      result: request,
    },
  };
}
