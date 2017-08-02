import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Actions from './Actions';
import Store from './Store';

export default class Overview extends Component {

    render () {
         return (
             <div>
              <div style={{ color:'white', paddingTop:'10rem', fontSize:'8rem' }}>
                `$${Store.money}`
              </div>
              <div style={{ fontSize:'4rem', color:'darkseagreen', paddingBottom:'4rem' }}>
                Scammed
              </div>
              <div style={{ fontSize:'2rem', color:'white' }}>
                Likelihood of getting caught:
              </div>
              <div style={{ fontSize:'4rem', color:'rgb(255, 64, 129)' }}>
                0.00%
              </div>
                <div style= {{ width: '80%', margin: 'auto', height: '20rem', paddingTop: '4rem' }}>
                    <RaisedButton label="Send Mail" secondary={true} />
                </div>
            </div>
         );
    }
}