import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, fetchVideos, fetchGif } from "../api/mediaApi";
import {
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice";
import { useEffect } from "react";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search,
  );

  const dispatch = useDispatch();

  useEffect(
    function () {
      if (!query) {
        dispatch(setResults([]));
        return;
      }

      const getData = async () => {
        try {
          dispatch(setError(null));
          dispatch(setLoading(true));

          let data = [];

          switch (activeTab) {
            case "photos": {
              const response = await fetchPhotos(query);

              data = response.map((item) => ({
                id: item.id,
                type: "photo",
                title: item.alt_description,
                link: item.links.html,
                src: item.urls.small_s3,
              }));
              break;
            }

            case "videos": {
              const response = await fetchVideos(query);

              data = response.map((item) => ({
                id: item.id,
                type: "video",
                title: item.user.name || "video",
                link: item.url,
                src: item.video_files[0].link,
              }));
              break;
            }

            case "gif": {
              const response = await fetchGif(query);

              data = response.map((item) => ({
                id: item.id,
                type: "gif",
                title: item.title || "gif",
                thumbnail: item.blur_preview,
                src: item.file.md.gif.url,
              }));
              break;
            }
          }

          dispatch(setResults(data));
        } catch (err) {
          dispatch(setError(err.message));
        }finally{
          dispatch(setLoading(false))
        }
      };

      getData();
    },
    [query, activeTab, dispatch],
  );


  if (error)
    return <h1 className="text-6xl text-center m-5 font-mono">Error</h1>;
  if (loading)
    return <h1 className="text-6xl text-center m-5 font-mono">Loading...</h1>;

  return (
    <div className="flex justify-center flex-wrap gap-8 overflow-auto px-10">
      {results.map((item) => {
        return <ResultCard key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ResultGrid;
