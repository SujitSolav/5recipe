import React, { useState } from "react";
import "./Fetchapi.css";

function Fetchapi() {
  const [apidata, setApidata] = useState([]);
  const [food, setFood] = useState("Pizza");
  const [loading, setLoading] = useState(false);

  const fetchapidata = async (e) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=8dada90d160149de92177f29f29f4a06&query=${food}`
      );
      const data = await response.json();
      setApidata(data.results);
    } catch (error) {
      console.error("error");
    } finally {
      setLoading(false);
    }
  };

  function displkay() {
    fetchapidata();
  }
  function handlechange(e) {
    setFood(e.target.value);
  }

  function handlesubmit(e) {
    e.preventDefault();
    displkay();
  }
  return (
    <>
      <h1> Get Your Recipe </h1>
      <form onSubmit={handlesubmit}>
        <input onChange={handlechange} value={food} type="text" />
        <button type="submit"> Get Your Favourite dish </button>
      </form>   
      {loading && (
        <div>
          {" "}
          <img
            style={{ height: "50px" }}
            src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
            alt=""
          />
        </div>
      )}
      <ul>
        {apidata.map((f) => (
          <li>
            <h2>{f.title}</h2>
            <img src={f.image} alt={food} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Fetchapi;
