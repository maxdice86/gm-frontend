import { useState, useEffect } from "react";
import { getGroupedRecords } from "../services/RestServices";
import DisplayAllRecords from "./DisplayAllRecords";

import SearchBar from "./SearchBar";

export default function Home() {
  const [clients, setClients] = useState([]);

  let nameArray = [];

  //Function to map client names into an new array
  function getNames() {
    nameArray = clients.map((c) => {
      return c.clients;
    });
    //Filter is applied to remove duplicate entries
    nameArray = nameArray.filter((v, i, a) => {
      return a.indexOf(v) === i;
    });
  }

  useEffect(() => {
    getGroupedRecords().then((res) => {
      setClients(() => res.data);
    });
  }, []);

  return (
    <>
      {getNames()}
      <section className="menu">
        <SearchBar placeholder="Search Client" data={nameArray} />
      </section>
      <section>
        <>
          <DisplayAllRecords all={true} />
        </>
      </section>
    </>
  );
}
