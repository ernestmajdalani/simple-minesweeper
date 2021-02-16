import React, { Component } from "react";
import "./App.css";
import Grid from "./Grid.js";
import Score from "./Score.js"
import ButtonNewGame from "./ButtonNewGame.js"
import Difficulty from "./Difficulty.js";
import Message from "./Message.js"

class App extends Component {

  state = {
    toggleNewGame: false,
    totalScore: 0,
    lost: false,
    difficulty: "easy"
  };

  // Mode de difficulté
  setDifficulty = (difficulty) => {
    this.setState({ difficulty: difficulty });
    this.resetGame();
  }

  //Fonction permettant d'additionner les points du joueur
  addToScore = (points) => {
    let currentScore = this.state.totalScore;
    currentScore += points;
    this.setState({ totalScore: currentScore });
  };

  //Fonction qui inverse this.state.toggleNewGame afin de redémarrer le jeu (passed as props to ButtonNewGame, Grid then Cell)
  resetGame = () => {
    this.setState({
      toggleNewGame: !this.state.toggleNewGame,
      totalScore: 0,
      lost: false
    });
  };

  //Fonction déterminant que le joueur a perdu (passed as props to Grid and then to Cell)
  setLostGame = () => {
    this.setState({ lost: true });
  };

  setNotLostGame = () => {
    this.setState({ lost: false });
  };

  render() {
    console.log('difficulty', this.state.difficulty);
    return (
      <div style={{ marginLeft: 200, marginTop: 50 }}>
        <div style={{ display: "flex" }}>
          <ButtonNewGame resetGame={this.resetGame} setLostGame={this.setLostGame} lost={this.state.lost}
            setNotLostGame={this.setNotLostGame} />
          <Difficulty setDifficulty={this.setDifficulty} />
        </div>
        <Grid totalScore={this.state.totalScore}
          difficulty={this.state.difficulty} lost={this.state.lost}
          setLostGame={this.setLostGame} toggleNewGame={this.state.toggleNewGame} addToScore={this.addToScore} />
        <Score totalScore={this.state.totalScore} toggleNewGame={this.state.toggleNewGame} />
        <Message lost={this.state.lost} totalScore={this.state.totalScore} />
      </div>
    )
  }
}

export default App;
