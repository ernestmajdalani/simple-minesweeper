import React, { Component } from "react";

class Cell extends Component {

  state = {
    hidden: true,
    isEnabled: true
  };
  // Si toggleNewGame a changé d'état (true to false ou bien false to true), cela redémarre le jeu avec une nouvelle grille
  componentDidUpdate(prevProps) {
    if (this.props.toggleNewGame !== prevProps.toggleNewGame) {
      this.setState({ hidden: true });
    }
  }

  componentWillUpdate(prevProps) {
    if (this.props.lost !== prevProps.lost) {
      this.setState({ hidden: false });
    }
  }

  render() {

    return (
      <div
        style={{
          backgroundColor: this.state.hidden ? "green" : "#8dd691",
          height: 40,
          width: 40,
          margin: 8,
          display: "table",
          justifyContent: "center",
          alignContent: "center"
        }}
        onClick={() => { //Ajout à la somme totale des points et montre la valeur de la case
          if (!this.props.lost && this.props.totalScore < 45) {
            if (this.state.hidden) {
              this.setState({ hidden: false });
              if (this.props.value !== 0) {
                this.props.addToScore(this.props.value);
              }
              else {
                this.props.setLostGame(); // Jeu perdu, lost = true, et ne satisfait plus la condition précédente
              }                           // --> case non clickable
            }
          }
        }}
      >
        {!this.state.hidden ? (
          <p
            style={{
              display: "table-cell",
              textAlign: "center",
              verticalAlign: "middle"
            }}
          >
            {this.props.value === 0 // si la valeur de la case est 0, il s'agit d'une bombe, sinon on voit la valeur
              ? <img src={require('./bomb.png')} alt='0' style={{ height: 20, width: 20 }} />
              : this.props.value}
          </p>
        ) : null}
      </div>
    );
  }
}

export default Cell;
