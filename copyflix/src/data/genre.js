import apiKey from "../utils/key";

export async function getGenres() {
  try {
    const resGenre = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`
    );
    const dataGenre = await resGenre.json();

    return dataGenre;
  } catch (err) {
    console.log(err);
  }
}
