import { useEffect, useState } from 'react';
import React from 'react';
import { JSX } from 'react';
import charactersData from './characters.json'
import './App.css'

interface Character {
    name: string;
    img: string;
    index: number; 
}

interface CardProps extends Character {
    handleCardClick: (index: number) => void;
  }
  
function Card({ img, name, index, handleCardClick }: CardProps): JSX.Element {
    return (
        <button className="card" onClick={() => handleCardClick(index)}>
        <img src={img} alt={name} />
        <h2 className="name">{name}</h2>
        </button>
    );
}


function App() {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [clickedCharacters, setClickedCharacters] = useState([]);
    const [characters, setCharacters] = useState<Character[]>(() => {
        // Initialize characters from JSON data
        return charactersData.characters.map((character, index) => ({
            ...character
        }));
    });
    
    const handleCardClick = (index:number) => {
        console.log("Card clicked:", index, clickedCharacters);
        // Shuffle characters after each click
        const ShuffledCharacters = [...characters].sort(() => Math.random() - 0.5);
        setCharacters(ShuffledCharacters);

        // Check if the character has already been clicked
        if (clickedCharacters.includes(index)) {
            setScore(0);
            setClickedCharacters([]);
        } else {
            const newScore = score + 1;
            setScore(newScore);
            setClickedCharacters([...clickedCharacters, index]);
            if (newScore > highScore) {
            setHighScore(newScore);
            }
            if( newScore === characters.length) {
                alert("Congratulations! You've clicked all characters!");
                setScore(0);
                setClickedCharacters([]);

            }
        }


    };

    
  
   const charactersCards = characters.map((character) => {
      return (
        <Card 
            index={character.index} 
            img={character.img} 
            name={character.name} 
            handleCardClick={handleCardClick}
            key={character.index}
        />
      );
    });


  return (
    <>
        <div className="score-container">
            <span>Score: {score}</span>
            <span>High Score: {highScore}</span>
        </div>

        {highScore === characters.length && (
            <div className="congratulations">
                <h1>Congratulations! You've clicked all characters!</h1>
                <p> If you want to play again, just restart the page</p>
            </div>
        )}
        {highScore < characters.length && (
        <div className="character-container">
            {charactersCards}
        </div>
        )}
    </>
  );
}


export default App
