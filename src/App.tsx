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
  isShuffling: boolean;
}

function Card({ img, name, index, handleCardClick, isShuffling }: CardProps): JSX.Element {
  return (
    <button className={`card ${isShuffling ? 'flip' : ''}`} onClick={() => handleCardClick(index)}>
      <img src={img} alt={name} />
      <h2 className="name">{name}</h2>
    </button>
  );
}

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCharacters, setClickedCharacters] = useState<number[]>([]);
  const [characters, setCharacters] = useState<Character[]>(() => {
    // Initialize characters from JSON data
    return charactersData.characters.map((character, index) => ({
      ...character,
      index // Ensure index is set
    }));
  });
  const [isShuffling, setIsShuffling] = useState(false);

  const handleCardClick = (index: number) => {
    console.log("Card clicked:", index, clickedCharacters);
    
    // Start flip animation for all cards
    setIsShuffling(true);
    
    // Check if the character has already been clicked
    if (clickedCharacters.includes(index)) {
      // Game over - reset after animation
      setTimeout(() => {
        setScore(0);
        setClickedCharacters([]);
        // Shuffle characters
        const shuffledCharacters = [...characters].sort(() => Math.random() - 0.5);
        setCharacters(shuffledCharacters);
        setIsShuffling(false);
      }, 300); // Half of animation duration
    } else {
      const newScore = score + 1;
      
      // Update score and clicked characters after animation
      setTimeout(() => {
        setScore(newScore);
        setClickedCharacters([...clickedCharacters, index]);
        
        if (newScore > highScore) {
          setHighScore(newScore);
        }
        
        if (newScore === characters.length) {
          alert("Congratulations! You've clicked all characters!");
          setScore(0);
          setClickedCharacters([]);
        }
        
        // Shuffle characters
        const shuffledCharacters = [...characters].sort(() => Math.random() - 0.5);
        setCharacters(shuffledCharacters);
        setIsShuffling(false);
      }, 300); // Half of animation duration
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
        isShuffling={isShuffling}
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
          <p>If you want to play again, just restart the page</p>
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