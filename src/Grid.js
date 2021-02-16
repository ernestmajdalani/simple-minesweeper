import React, { Component } from "react";
import "./App.css";
import Cell from "./Cell";
import SolverCell from "./SolverCell";
/*
La grille debute remplie de trois. J'ai supposé que le jeu va comprendre un total de 8 bombes ce qui veut 
dire que le nombre total de points disponible est de 108-24=84. setBombs() choisis 8 positions aléatoires DISTINCTES
pour positionner les bombes. Ensuite setNumbers() identifie les '3' restant, et les change a des '1' et '2' jusqu'à 
ce que la somme total des points correspond a la marge donnée par la difficulté sélectionnée par l'utilisateur.
La logique derrière la difficulté est de donner à l'utilisateur moins ou plus de points disponibles pour gagner
dépendamment de l'option choisie 
*/
class Grid extends Component {
  state = {
    maxSum: 84, // Somme totale comptant 8 bombes
    grid: [ // Initialisation de base
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3]
    ],
    numberOfPoints: 70
  };
  //Re-position de la matrice de base
  componentDidMount() {
    this.newGame();
  }

  componentDidUpdate(prevProps) {
    if (this.props.toggleNewGame !== prevProps.toggleNewGame) { //Redémarre le jeu quand toggleNewGame change de state
      this.newGame();
    }
    if (this.props.difficulty !== prevProps.difficulty) { // Si l'utilisateur change de difficulté, cela redémarre le jeu
      if (this.props.difficulty === 'easy') {
        this.setState({
          numberOfPoints: 70 // Points disponibles pour le jeu = 70
        })
      }
      else if (this.props.difficulty === 'medium') {
        this.setState({
          numberOfPoints: 57 // Points disponibles pour le jeu = 57
        })
      }
      else if (this.props.difficulty === 'hard') {
        this.setState({
          numberOfPoints: 47 // Points disponibles pour le jeu = 47 
        }) // La matrice étant initialisée à des '3' la somme de 47 prend en considération le cas ou le '3' devient '1'
      }   // permettant de garder un score de 45 pour gagner.
    }
  }

  newGame = () => { // re-initialisation de la matrice de base suivie de la position aléatoire de nombres et bombes
    const grid = [
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3]
    ];
    this.setState({ grid: grid, maxSum: 84 }, () => {
      this.setBombs();
      this.setNumbers();
    });
  }

  setBombs = () => {

    let newGrid = this.state.grid;

    // Positionnement aléatoire des bombes
    for (let i = 0; i < 8; ++i) {

      let rowIndex = Math.floor(Math.random() * 6);
      let columnIndex = Math.floor(Math.random() * 6);

      // Vérification si la même position a été générée
      while (newGrid[rowIndex][columnIndex] === 0) {
        rowIndex = Math.floor(Math.random() * 6);
        columnIndex = Math.floor(Math.random() * 6);
      }

      newGrid[rowIndex][columnIndex] = 0;
    }

    this.setState({
      grid: newGrid
    });
  }
  // Changement des '3' à des '1' et '2' aléatoirement
  setNumbers = () => {
    let total = this.state.maxSum;
    let newGrid = this.state.grid;

    while (total <= this.state.maxSum && total >= this.state.numberOfPoints) { // Difficulty can be modified here 47 to make sure we don't go under 45
      let x = Math.floor(Math.random() * 6);
      let y = Math.floor(Math.random() * 6);

      if (newGrid[x][y] === 3) {
        let newNum = Math.floor(Math.random() * 2) + 1; // Génération aléatoire de 1 et 2
        total -= (3 - newNum); // Soustraction de la somme totale des points
        newGrid[x][y] = newNum;
      }
    }
    this.setState({
      grid: newGrid,
      maxSum: total
    });
  }
  // Permet de calculer les points sur une ligne
  sumOfRow = (rowArr) => {
    let sum = 0;
    for (let i = 0; i < rowArr.length; ++i) {
      sum += rowArr[i];
    }
    return sum;
  }
  // Permet de calculer les bombes sur une ligne
  numberOfRowBombs = (rowArr) => {
    let bombSum = 0;
    for (let i = 0; i < rowArr.length; ++i) {
      if (rowArr[i] === 0) {
        ++bombSum;
      }
    }
    return bombSum;
  }
  // calcul des bombes et points sur une colonnes (important pour solverCell)
  sumOfColumn = (columnIndex) => {
    const grid = this.state.grid;
    let sum = 0;
    let bombSum = 0;
    for (let i = 0; i < 6; ++i) {
      sum += grid[i][columnIndex];
      if (grid[i][columnIndex] === 0) {
        ++bombSum;
      }
    }
    return { sum: sum, bombSum: bombSum };
  }
  render() {
    const callbackCell = (num, index) => {
      return <Cell totalScore={this.props.totalScore} lost={this.props.lost} setLostGame={this.props.setLostGame} value={num}
        addToScore={this.props.addToScore} key={index} toggleNewGame={this.props.toggleNewGame} />; // Retour d'une seule case
    };

    const callbackRow = (rowArray, index) => {
      return ( // Retour d'une ligne
        <div key={index} style={{ display: "flex" }}>
          {rowArray.map(callbackCell)}
          <SolverCell sum={this.sumOfRow(rowArray)} bombs={this.numberOfRowBombs(rowArray)} />
        </div>
      );
    };

    // Rappel de la fonction sumOfColumn pour calculer la somme des cases dans la colonne 'i'
    let solverRow = []; // solverRow représente la ligne de solverCells
    for (let i = 0; i < 6; ++i) {
      const obj = this.sumOfColumn(i);
      solverRow.push(<SolverCell key={i} sum={obj.sum} bombs={obj.bombSum} />);
    }

    return (
      <div>
        {this.state.grid.map(callbackRow)} {/*retour de toute la grille avec mapping to callbackRow */}
        <div style={{ display: "flex" }}> {/* retour de la ligne de SolverCell en dessous de la grille*/}
          {solverRow}
        </div>
      </div>
    );
  }
}
export default Grid;