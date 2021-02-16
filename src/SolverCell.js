import React, { Component } from "react";

class SolverCell extends Component {
  state = {};

  render() {
    return (
      <div
        style={{
          backgroundColor: "pink",
          height: 40,
          width: 40,
          margin: 8,
          display: "table",
          justifyContent: "center",
          alignContent: "center",
          fontSize: 12
        }}
      >
        {!this.state.hidden ? (
          <p
            style={{
              display: "table-cell",
              textAlign: "center",
              verticalAlign: "middle",
            }}
          > {/* Retour du nombre de points/bombes dans la ligne/colonne */}
            {this.props.sum}/{this.props.bombs}<img src={require('./bomb.png')} alt='' style={{ height: 12, width: 12 }} />
          </p>
        ) : null}
      </div>
    );
  }
}

export default SolverCell;
