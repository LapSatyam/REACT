import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import ResultGrid from "../components/ResultGrid";
import Tabs from "../components/Tabs";

const HomePage = () => {
  const { query } = useSelector((store) => store.search);

  return (
    <>
      <SearchBar />

      {query && (
        <>
          <Tabs />
          <ResultGrid />
        </>
      )}
    </>
  );
};

export default HomePage;
