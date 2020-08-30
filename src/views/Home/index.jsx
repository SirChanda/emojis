import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import "./main.css";

export default () => {
  const [emojis, setEmojis] = useState({ total: [], filtered: [] });
  const [params, setParams] = useState("");

  const searchField = useRef(null);

  useEffect(() => {
    fetch(
      "https://api.github.com/emojis?fbclid=IwAR1Y21JuFMFgsN96nqK4QS-Q5Xh7ogCGiqHZNelIFaI2-Vm-xUsUFHEhPKc"
    )
      .then((response) => response.json())
      .then((result) => {
        const data = Object.entries(result);
        setEmojis({ ...emojis, total: data, filtered: data });
      });
  }, []);

  const filterEmojis = (param) => {
    const filtered = emojis["total"].filter((item) => {
      const regex = new RegExp(`^${param.toLowerCase()}`);

      return regex.test(item[0].toLowerCase());
    });

    setEmojis({
      ...emojis,
      filtered,
    });
  };

  return (
    <div>
      <Header></Header>
      <div className="results">
        <div className="search">
          <input
            type="text"
            placeholder="write to search... (example: ireland)"
            className="text"
            ref={searchField}
            onChange={(e) => setParams(e.target.value)}
          />
          <input
            type="button"
            value="Search"
            className="button"
            onClick={() => filterEmojis(searchField.current.value)}
          />
        </div>
        <div className="emojis">
          {emojis["filtered"].length > 0 ? (
            emojis["filtered"].map((item) => (
              <Card name={item[0]} img={item[1]}></Card>
            ))
          ) : (
            <p>No results</p>
          )}
        </div>
      </div>
    </div>
  );
};
