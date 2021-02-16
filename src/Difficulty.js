import React, { Component } from 'react';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

class Difficulty extends Component {

    handleChangeDifficulty = (value) => {
        let difficulty;
        if (value === 1) {
            difficulty = 'easy';
        } else if (value === 2) {
            difficulty = 'medium';
        } else if (value === 3) {
            difficulty = 'hard';
        }
        this.props.setDifficulty(difficulty);
    }

    render() {
        return (
            <ButtonToolbar style={{ marginLeft: 20 }}>
                <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.handleChangeDifficulty}>
                    <ToggleButton value={1}>Easy</ToggleButton>
                    <ToggleButton value={2}>Medium</ToggleButton>
                    <ToggleButton value={3}>Hard</ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>
        );
    }
}

export default Difficulty;