import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Api from '../services/api';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    getResults = () => {
        Api.getStuff()
            .then(result => console.log(result));

    }

    render() {
        return (
            <div>
                This is the homepage
                <p><button onClick={this.getResults}>Get</button></p>
            </div>
        );
    }
}

const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
