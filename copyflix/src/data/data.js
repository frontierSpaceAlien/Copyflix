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

export async function getBillboardMovie() {
  try {
    const randPage = Math.floor(Math.random() * (50 - 1)) + 1;
    const resLatest = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${randPage}&api_key=${apiKey}`
    );
    const latestID = await resLatest.json();
    const rand = Math.floor(Math.random() * (20 - 0)) + 0;

    console.log(latestID);

    return latestID.results[rand];
  } catch (err) {
    console.log(err);
  }
}

export async function getBrowseData(genreID) {
  var res = null;
  var data = null;
  var browseData = [];
  for (var i = 0; i < genreID.length; i++) {
    res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=2&with_genres=${genreID[i].id}`
    );
    data = await res.json();
    browseData.push(data.results);

    for (let i = 0; i < browseData.length; i++) {
      for (let e = 0; e < browseData[i].length - 1; e++) {
        for (let f = 0; f < browseData[i][e].genre_ids.length; f++) {
          for (let t = 0; t < genreID.length; t++) {
            if (genreID[t].id === browseData[i][e].genre_ids[f]) {
              browseData[i][e].genre_ids[f] = genreID[t].name;
            }
          }
        }
      }
    }
  }

  return browseData;
}
