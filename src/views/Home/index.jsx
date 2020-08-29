import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import "./main.css";

export default () => {
  const [emojis, setEmojis] = useState([]);
  const [params, setParams] = useState("");

  useEffect(() => {
    fetch(
      "https://api.github.com/emojis?fbclid=IwAR1Y21JuFMFgsN96nqK4QS-Q5Xh7ogCGiqHZNelIFaI2-Vm-xUsUFHEhPKc"
    )
      .then((response) => response.json())
      .then((result) => {
        setEmojis(Object.entries(result));
      });
  });

  const filterEmojis = (param) => {
    return emojis.map((item) => item[0].match(`/${param}.*/`));
  };

  return (
    <div>
      <Header></Header>
      <div className="results">
        {emojis.length > 0 ? (
          <div className="search">
            <input
              type="text"
              placeholder="write to search... (example: ireland)"
              className="text"
              onChange={(e) => setParams(e.target.value)}
            />
            <input
              type="button"
              value="Search"
              className="button"
              onClick={(e) => setParams(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        <div className="emojis">
          {filterEmojis(params).length > 0 ? (
            emojis.map((item) => <Card name={item[0]} img={item[1]}></Card>)
          ) : (
            <p>No results</p>
          )}
        </div>
      </div>
    </div>
  );
};
