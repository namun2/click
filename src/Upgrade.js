import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { observer } from 'mobx-react';
import Store from './Store';

@observer
export default class Upgrade extends Component {

    static PropTypes = {
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        purchase: React.PropTypes.func.isRequired,
        quote: React.PropTypes.string,
    };

    render () {
        const disabled = Store.money < this.props.price;
        const style = {
            height: this.props.quote ? '10rem' : '8rem',
            width: '80%',
            textAlign: 'left',
            boxShadow: 'rgb(0, 0, 0) 0px 19px 60px, rgba(0, 0, 0, 0.22) 0px 15px 20px',
            fontFamily: 'Droid Serif, serif',
            backgroundColor: '#021526',
            margin: 'auto',
            fontWeight: '600',
            borderColor: disabled ? 'grey' : 'white',
            borderStyle: 'solid',
            borderRadius: '0.8rem',
            minWidth: '5.6rem',
        };

        const headingStyle = {
            paddingLeft: '2rem',
            color: disabled ? 'grey' : 'white',
            paddingTop: '1rem',
            lineHeight: '0',
            fontSize: '1.4rem',
        }

        const descriptionStyle = {
            paddingLeft: '2rem',
            paddingTop: '1rem',
            color: disabled ? 'grey' : 'white',
            paddingBottom: '1rem',
        }
        const quoteStyle = {
            paddingLeft: '2rem',
            paddingTop: '1rem',
            color: disabled ? 'grey' : 'white',
            paddingBottom: '1rem',
            fontSize: '0.8rem'
        }
        const priceStyle = {
            float: 'right',
        }
         return (
            <div style={{ paddingTop: '2.4rem' }}>
                <Paper zDepth={3} style={style}>
                    <RaisedButton disabled={disabled} label="Purchase" onClick={this.props.purchase} primary={true} style={{ float: 'right', marginRight: '1rem', top: '50%', transform: 'translateY(-50%)', position: 'relative', width: '30%', maxWidth: '16rem', minWidth: '12rem' }} buttonStyle={{ backgroundColor: 'darkseagreen' }} labelStyle={{ fontSize: '1.2rem' }} />
                    <div style={{ paddingTop: '1rem', paddingRight: '1rem' }}>
                        <span style={headingStyle}>{this.props.title}<span style={{ paddingLeft: '2rem' }}>${this.props.price}</span></span><br /> <br />
                        <span style={descriptionStyle}>{this.props.description}</span><br /><br />
                        <span style={descriptionStyle}>Owned: {this.props.count}</span>
                        <div style={{ height: '0.4rem' }}/>
                        <span style={quoteStyle}><i>"{this.props.quote}"</i></span>
                    </div>
                </Paper>
            </div>
         );
    }
}