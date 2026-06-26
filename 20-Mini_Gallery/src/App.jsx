import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getData } from "./api/picsm";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(3);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const newData = await getData(page);

        setData((prev) => [...prev, ...newData]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "300px" },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  return (
    <>
      <div className="min-h-screen w-full bg-transparent columns-2 md:columns-3 lg:columns-4 gap-4">
        {data.map((pic) => (
          <a
            rel="noopener noreferrer"
            href={pic.url}
            key={pic.id}
            target="_blank"
            alt={`Photo by ${pic.author}`}
          >
            <img
              className="mb-4 w-full rounded-lg"
              src={pic.download_url}
              alt=""
            />
          </a>
        ))}
      </div>

      <div
        ref={loaderRef}
        className="h-20 w-full flex justify-center items-center opacity-80"
      >
        {loading && <h2 className="text-2xl font-bold">Loading...</h2>}
      </div>
    </>
  );
};

export default App;
