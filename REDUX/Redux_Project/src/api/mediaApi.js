import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const KLIPY_KEY = import.meta.env.VITE_KLIPY_KEY;

const unsplash = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${UNSPLASH_KEY}`,
  },
});

const pexels = axios.create({
  baseURL: "https://api.pexels.com/v1",
  headers: {
    Authorization: PEXELS_KEY,
  },
});

const klipy = axios.create({
  baseURL: `https://api.klipy.com/api/v1/${KLIPY_KEY}`,
});

export async function fetchPhotos(query, page = 1, per_page = 20) {
  const { data } = await unsplash.get("/search/photos", {
    params: { query, page, per_page },
  });
  return data.results;
}

export async function fetchVideos(query, page = 1, per_page = 20) {
  const { data } = await pexels.get("/videos/search", {
    params: { query, page, per_page },
  });
  return data.videos;
}

export async function fetchGif(
  q,
  page = 1,
  per_page = 20,
  customer_id,
  locale,
  content_filter,
) {
  const { data } = await klipy.get("/gifs/search", {
    params: {
      q,
      page,
      per_page,
      customer_id,
      locale,
      content_filter,
    },
  });
  return data.data.data;
};
