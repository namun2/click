import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Slider from 'material-ui/Slider';
import Upgrade from './Upgrade';
import Store from './Store';
import { workerTimer } from './WorkerTimer';

@observer
export default class TargetedMail extends Component {

    static PropTypes = {
        open: React.PropTypes.bool.isRequired,
        close: React.PropTypes.func.isRequired,
    }

    state = {
        finished: false,
        value: 0,
        slider: 10,
    };

  handleSlider = (event, value) => {
    this.setState({slider: value});
  };

  handleNext = () => {
    Store.setTargetedMailStepIndex(Store.getTargetedMailStepIndex() + 1);
    if (Store.getTargetedMailStepIndex() >= 3) {
      const intervalId = workerTimer.setInterval(() => {
        const progress = Store.getTargetedMailProgress() + (1 / Store.duration) * 10;
        if (progress < 101) {
          Store.setTargetedMailProgress(progress);
        } else {
          Store.setTargetedMailInProgress(false);
          Store.setDuration(null);
          Store.setTargetedMailStepIndex(0);
          Store.setTargetedMailProgress(0);
          workerTimer.clearInterval(intervalId);
        }
      }, 100);
      Store.setTargetedMailInProgress(true);
    }
  };

   getStepContent() {
    switch (Store.getTargetedMailStepIndex()) {
      case 0:
      const items = [];
      toJS(Store.getThemes()).forEach((theme, i) => {
        //   console.log(theme.name);
        items.push(<MenuItem value={i} key={i} primaryText={theme.name} disabled={!theme.available} />);
      });
        const themes =      
         <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange}>
            {items}
         </DropDownMenu>;
      return themes;
      case 1:
      const ageArray = [];
      toJS(Store.getAgeGroups()).forEach((ageGroup, i) => {
        //   console.log(theme.name);
        ageArray.push(<MenuItem value={i} key={i} primaryText={ageGroup.name} disabled={!ageGroup.available} />);
      });
        const ageGroups =      
         <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange}>
            {ageArray}
         </DropDownMenu>;
      return ageGroups;
      case 2:
      const slider = 
      <div>
              <Slider
          min={10}
          max={100}
          step={10}
          value={this.state.slider}
          onChange={this.handleSlider}
          style={{ paddingLeft:'1.6rem' }}
        />
        <p>Target <span style={{ color: 'darkseagreen' }}>{this.state.slider}</span> customers.</p>
        <p>Duration: <span style={{ color: 'rgb(255, 64, 129)' }}>{Store.getDuration(this.state.slider / 10)} seconds</span></p>
        </div>;
        return slider;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handlePrev = () => {
    Store.setTargetedMailStepIndex(Store.getTargetedMailStepIndex() - 1);
  };

   handleChange = (event, index, value) => this.setState({value});

    render () {
      const stepIndex = Store.getTargetedMailStepIndex();
      const inProgress = Store.getTargetedMailInProgress();
        
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.close}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.props.close}
      />,
    ];


         return (
                    <Dialog
          title="Targeted Mail"
          open={this.props.open}
          onRequestClose={this.props.close}
        >
          <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Select theme</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select Age group</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select Number of customers</StepLabel>
          </Step>
        </Stepper>
                  {inProgress ? (
                    <div>
            <p>
              Your targeted email has been sent to the respective customers.
            </p>
            <p>You must wait until the responses are received before you send more.</p>
            </div>
          ) : (
            <div>
              <div>{this.getStepContent()}</div>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Send' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          )}
        </Dialog>
         );
    }
}