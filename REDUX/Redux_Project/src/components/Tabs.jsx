import { setActiveTabs } from "../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const Tabs = () => {
  const tabs = ["photos", "videos", "gif"];

  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.search.activeTab);

  const buttonStyle =
    "rounded px-5 py-2 font-normal uppercase transition active:scale-95";

  return (
    <div className="flex gap-10 p-10 justify-center">
      {tabs.map((elem) => {
        return (
          <button
            className={`${buttonStyle} ${activeTab === elem ? "bg-blue-700" : "bg-gray-600"} `}
            onClick={() => dispatch(setActiveTabs(elem))}
            key={elem}
          >
            {elem}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
