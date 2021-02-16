import React, { Component } from 'react';

class Message extends Component {

    state = {
        message: "You need 45 points"
    };

    render() {
        return (
            < div >
                {this.props.totalScore >= 45 ? "Congratulations! You win!" :
                    !this.props.lost && this.props.totalScore < 45 ? "You need 45 points" : "You lost! Better Luck Next time !"}
            </div >
        );
    }
}

export default Message;