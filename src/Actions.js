import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

export default class Actions extends Component {

    render () {
         return (
            <div style= {{ width: '80%', margin: 'auto', height: '20rem', paddingTop: '4rem' }}>
                <RaisedButton label="Send Mail" secondary={true} />
            </div>
         );
    }
}