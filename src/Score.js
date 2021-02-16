import React, { Component } from 'react';

class Score extends Component {

    render() {
        return (<div>
            <span style={{ paddingLeft: 280 }}> Current score: {this.props.totalScore} </span>
        </div>)
    }
}

export default Score;