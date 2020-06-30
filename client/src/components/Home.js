import React, { Component } from 'react'
import CreateAccount from "./CreateAccount"
import ShowAccount from "./ShowAccount"

class Home extends Component {
    render() {
        return (
            <div className="box">
                <CreateAccount/>
                <ShowAccount/>
            </div>
        )
    }
}

export default (Home)