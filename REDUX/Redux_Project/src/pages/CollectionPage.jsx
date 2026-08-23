import { useDispatch, useSelector } from "react-redux";
import { clearCollection } from "../redux/features/collectionSlice";
import CollectionCard from "../components/CollectionCard";

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items);

  const dispatch = useDispatch();

  const clearAll = () => {
    if (window.confirm("Clear your entire collection?")) {
      dispatch(clearCollection());
    }
  };

  return (
    <div className="overflow-auto px-10 py-6">
      {collection.length > 0 ? (
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-medium">Your Collection</h2>
          <button
            onClick={clearAll}
            className="active:scale-95 transition bg-red-600 px-8 py-3 text-lg rounded"
          >
            Clear Collection
          </button>
        </div>
      ) : (
        <h2 className="text-5xl py-10 text-gray-300 text-center font-medium">
          Collection is Empty
        </h2>
      )}

      <div className="flex justify-start w-full flex-wrap gap-6">
        {collection.map((item) => {
          return <CollectionCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default CollectionPage;
