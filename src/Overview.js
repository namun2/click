import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import Actions from './Actions';
import { observer } from 'mobx-react';
import Store from './Store';
import TargetedMail from './TargetedMail';

@observer
export default class Overview extends Component {

  state = {
    open: false,
    completed: 0,
  };

//  componentDidMount() {
//     this.timer = setTimeout(() => this.progress(5), 1000);
//   }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress = (completed) => {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    Store.setTargetedMailStepIndex(0);
    Store.setTargetedMailFinished(false);
    this.setState({open: false});
  };

    render () {
      const duration = Store.duration;
      const progress = Store.getTargetedMailProgress();
         return (
             <div>
              <div style={{ color:'white', paddingTop:'4rem', fontSize:'8rem' }}>
                ${Store.getMoney()}
              </div>
              <div style={{ fontSize:'4rem', color:'darkseagreen', paddingBottom:'4rem' }}>
                Scammed
              </div>
              <div style={{ fontSize:'2rem', color:'white' }}>
                Likelihood of getting caught:
              </div>
              <div style={{ fontSize:'4rem', color:'rgb(255, 64, 129)' }}>
                {Store.caughtProb.toFixed(2)}%
              </div>
                <div style= {{ width: '80%', margin: 'auto', height: '3rem', paddingTop: '4rem' }}>
                    <RaisedButton label="Send Mail" secondary={true} onClick={() => Store.sendManualMail()} />
                </div>
              <div style={{ fontSize:'2rem', color:'white' }}>
                to earn ${(Store.mailValue.money + Store.getAddtionalValues() + Store.getManualAdditionalValues()).toFixed(2)}
              </div>
              <div style= {{ width: '80%', margin: 'auto', paddingTop: '4rem' }}>
                  <RaisedButton label="Send Targeted Mail" primary={true} onTouchTap={this.handleOpen} />
                  <TargetedMail open={this.state.open} close={this.handleClose} />
              </div>
              <div style={{ width: '80%', margin: 'auto' }}>
                <LinearProgress mode="determinate" value={progress} style={{ marginTop: '2rem' }} />
                <p style={{ fontSize:'2rem', color:'white', lineHeight: '0' }}>{duration == null ? '' : (duration - duration * progress * 0.01).toFixed(1) + 's'}</p>
              </div>
            </div>
         );
    }
}