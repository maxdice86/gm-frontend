import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onSearch = () => {
    navigate("/records", { state: search }, { replace: true });
  };

  return (
    <>
    {/* Creates a custom search field that captures input values */}
      <div className="search-container">
        <form className="frm" onSubmit={onSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-success btn-sm">
            Search
          </button>
        </form>
        {/* Create dropdown menu and loop through array of names
             top be displayed in box */}
        <div className="dropdown">
          {props.data
            .filter((item) => {
              return (
                search.toLowerCase() &&
                item.toLowerCase().startsWith(search.toLowerCase()) &&
                item.toLowerCase() !== search.toLowerCase()
              );
            })
            .map((item) => {
              return (
                <div
                  key={item.value}
                  className="dropdown-row"
                  onClick={() => {
                    setSearch(item);
                  }}
                >
                  {item}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
