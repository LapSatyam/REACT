import { useState, useEffect, useRef } from "react";
import { getData } from "./api/picsm";
import { distributePins } from "./utils/distributePins";
import Pin from "./components/Pic";

const App = () => {
  const [data, setData] = useState([[], [], [], []]);
  const [page, setPage] = useState(3);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const newData = await getData(page);

        setData((prev) => distributePins(prev, newData));
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
      { rootMargin: "400px" },
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
      <div className="min-h-screen w-full bg-transparent flex gap-4">
        {data.map((column) => (
          <div className="flex-1">
            {column.map((pic) => (
              <Pin pic={pic} />
            ))}
          </div>
        ))}
      </div>

      <div
        ref={loaderRef}
        className="h-20 w-full flex justify-center items-center"
      >
        {loading && <h2 className="text-2xl font-bold">Loading...</h2>}
      </div>
    </>
  );
};

export default App;
