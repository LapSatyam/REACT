import { useDispatch } from "react-redux";
import {
  removeCollection,
  removeToast,
} from "../redux/features/collectionSlice";

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCollection = () => {
    dispatch(removeCollection(item.id));
    dispatch(removeToast());
  };

  return (
    <div className="w-[18vw] relative h-80 rounded-xl overflow-hidden bg-white">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="h-full"
        href={item.link}
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

      <div className="absolute bottom-0 flex w-full items-center justify-between gap-3 bg-linear-to-b from-transparent to-black px-4 py-6">
        <h2 className="h-14 overflow-hidden text-lg font-semibold capitalize">
          {item.title}
        </h2>

        <button
          onClick={removeFromCollection}
          className="bg-red-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
