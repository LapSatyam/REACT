import { useDispatch } from "react-redux";
import { addCollection, addedToast } from "../redux/features/collectionSlice";

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCollection = () => {
    dispatch(addCollection(item));
    dispatch(addedToast());
  };

  return (
    <div className="relative h-80 w-[18vw] overflow-hidden rounded-xl bg-white">
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {item.type === "video" ? (
          <video
            className="h-full w-full object-cover object-center"
            src={item.src}
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            className="h-full w-full object-cover object-center"
            src={item.src}
            alt={item.title}
          />
        )}
      </a>

      <div className="absolute bottom-0 flex w-full items-center bg-linear-to-b from-transparent to-black/80 justify-between gap-3 px-4 py-3">
        <h2 className="h-14 overflow-hidden text-lg font-semibold capitalize">
          {item.title}
        </h2>

        <button
          onClick={addToCollection}
          className="rounded bg-indigo-600 px-3 py-1 font-medium text-white active:scale-95"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ResultCard;