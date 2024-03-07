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

export async function getTVGenre() {
  try {
    const resGenre = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=${apiKey}`
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

export async function getBillboardTV() {
  try {
    const randPage = Math.floor(Math.random() * (50 - 1)) + 1;
    const resLatest = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${randPage}&api_key=${apiKey}`
    );
    const latestID = await resLatest.json();
    const rand = Math.floor(Math.random() * (20 - 0)) + 0;

    return latestID.results[rand];
  } catch (err) {
    console.log(err);
  }
}

export async function getTVGenres() {
  try {
    const resGenre = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=${apiKey}`
    );
    const dataGenre = await resGenre.json();

    return dataGenre;
  } catch (err) {
    console.log(err);
  }
}

export async function getTVShows(genreID) {
  var res = null;
  var data = null;
  var tvData = [];
  for (var i = 0; i < genreID.length; i++) {
    res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?language=en-US&api_key=${apiKey}&page=1&with_genres=${genreID[i].id}`
    );
    data = await res.json();
    tvData.push(data.results);

    for (let i = 0; i < tvData.length; i++) {
      for (let e = 0; e < tvData[i].length - 1; e++) {
        for (let f = 0; f < tvData[i][e].genre_ids.length; f++) {
          for (let t = 0; t < genreID.length; t++) {
            if (genreID[t].id === tvData[i][e].genre_ids[f]) {
              tvData[i][e].genre_ids[f] = genreID[t].name;
            }
          }
        }
      }
    }
  }

  return tvData;
}

export async function getPopularMovies(genreID) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
    );
    const data = await res.json();

    for (let i = 0; i < data.results.length; i++) {
      for (let e = 0; e < data.results[i].genre_ids.length; e++) {
        for (let t = 0; t < genreID.genres.length; t++) {
          if (data.results[i].genre_ids[e] === genreID.genres[t].id) {
            data.results[i].genre_ids[e] = genreID.genres[t].name;
          }
        }
      }
    }

    return data.results;
  } catch (err) {
    console.log(err);
  }
}

export async function getNowPlayingMovies(genreID) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2&api_key=${apiKey}`
    );
    const data = await res.json();

    for (let i = 0; i < data.results.length; i++) {
      for (let e = 0; e < data.results[i].genre_ids.length; e++) {
        for (let t = 0; t < genreID.genres.length; t++) {
          if (data.results[i].genre_ids[e] === genreID.genres[t].id) {
            data.results[i].genre_ids[e] = genreID.genres[t].name;
          }
        }
      }
    }

    return data.results;
  } catch (err) {
    console.log(err);
  }
}

export async function getUpcomingMovies(genreID) {
  try {
    const today = new Date().toISOString().split("T");
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${today[0]}&sort_by=popularity.desc&api_key=${apiKey}`
    );
    const data = await res.json();

    for (let i = 0; i < data.results.length; i++) {
      for (let e = 0; e < data.results[i].genre_ids.length; e++) {
        for (let t = 0; t < genreID.genres.length; t++) {
          if (data.results[i].genre_ids[e] === genreID.genres[t].id) {
            data.results[i].genre_ids[e] = genreID.genres[t].name;
          }
        }
      }
    }

    return data.results;
  } catch (err) {
    console.log(err);
  }
}

export async function getPopularTV(genreID) {
  try {
    const today = new Date().toISOString().split("T");
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?air_date.lte=${today[0]}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=en&without_genres=10767%2C%2010763&api_key=${apiKey}`
    );
    const data = await res.json();

    for (let i = 0; i < data.results.length; i++) {
      for (let e = 0; e < data.results[i].genre_ids.length; e++) {
        for (let t = 0; t < genreID.genres.length; t++) {
          if (data.results[i].genre_ids[e] === genreID.genres[t].id) {
            data.results[i].genre_ids[e] = genreID.genres[t].name;
          }
        }
      }
    }

    return data.results;
  } catch (err) {
    console.log(err);
  }
}

export async function getAiringToday(genreID) {
  try {
    const today = new Date().toISOString().split("T");
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?air_date.gte=${today[0]}&air_date.lte=${today[0]}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&timezone=Pacific%2FAuckland&with_original_language=en&without_genres=10767%2C10763&api_key=${apiKey}`
    );
    const data = await res.json();

    for (let i = 0; i < data.results.length; i++) {
      for (let e = 0; e < data.results[i].genre_ids.length; e++) {
        for (let t = 0; t < genreID.genres.length; t++) {
          if (data.results[i].genre_ids[e] === genreID.genres[t].id) {
            data.results[i].genre_ids[e] = genreID.genres[t].name;
          }
        }
      }
    }

    return data.results;
  } catch (err) {
    console.log(err);
  }
}

export async function getTrailers(id) {
  try {
    var res = null;
    var data = [];
    var trailers = [];
    res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${apiKey}`
    );
    data = await res.json();

    if (data.results !== undefined) {
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].type === "Trailer") {
          trailers.push(data.results[i]);
        }
      }
    }

    return trailers;
  } catch (err) {
    console.log(err);
  }
}

export async function getTvVideos(id) {
  try {
    var res = null;
    var data = [];
    var trailers = [];
    res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=${apiKey}`
    );
    data = await res.json();

    console.log(data.results);

    if (data.results !== undefined) {
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].type === "Trailer") {
          trailers.push(data.results[i]);
        }
      }
    }

    return trailers;
  } catch (err) {
    console.log(err);
  }
}
