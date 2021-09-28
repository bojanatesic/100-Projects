import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './App.css';
import { Container } from 'react-bootstrap';

function App() {
  const [meal, setMeal] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [shouldImageShow, setShouldImageShow] = useState(false);


  const getMeal = () => {
    return axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.data.meals[0])
      .catch(error => console.log(error))
  }

  const randomMeal = () => {
    getMeal().then((response) => {
      const meal = response
      setMeal(meal)
      setIsLoading(false);
      setShouldImageShow(true);
      // console.log(meal)
    })
  }

  return (
    <Container fluid="md" className="App">
      <div>
        <p>Feeling hungry?</p>
        <p>Get a random meal by clicking a button below</p>
      </div>
      <div className="top-div">
        <button disabled={isLoading} className="btn" onClick={() => randomMeal()}>Get meal 🍔</button>
      </div>
      {isLoading ? (
        <div class='lds-spinner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        shouldImageShow && (
          <div>
            <div>
              <h1> {meal.strMeal}</h1>
            </div>
            <div>
              <p> Category : {meal.strCategory}</p>
              <p> Area: {meal.strArea}</p>
            </div>
            <div>
              <h2>Instructions:</h2>
              <span> Instructions: {meal.strInstructions} </span>
            </div>
            <div className="img-div">
              <img src={meal.strMealThumb} alt="Food" fluid />
            </div>
            <div>
              <ReactPlayer className="player" url={meal.strYoutube} />
            </div>
          </div>
        )
      )}
    </Container>
  );
}

export default App;
