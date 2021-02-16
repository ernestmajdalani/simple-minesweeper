import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class ButtonNewGame extends Component {

    render() {
        return (
            <Button bsStyle="primary" bsSize="small" onClick={() => this.props.resetGame()}>New Game</Button>);
    }
}

export default ButtonNewGame;