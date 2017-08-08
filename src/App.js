import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import './App.css';
import Overview from './Overview';
import Upgrades from './Upgrades';
import Stats from './Stats';
import Store from './Store';
import { workerTimer } from './WorkerTimer';

class App extends Component {
  
  constructor() {
    super();
    console.log(workerTimer);
    workerTimer.setInterval(Store.monkeyTimer, 100);
    // setInterval(Store.monkeyTimer, 100);
  }

  state = {
    slideIndex: 0,
    open: false,
    title: 'Overview',
  };

  titleArray = ['Overview', 'Upgrades', 'Team'];


  handleChange = (value) => {
    this.setState({
      slideIndex: value,
      title: this.titleArray[value],
    });
  };

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
       <MuiThemeProvider>
        <div className="App" style={{ backgroundColor: '#021526', height: '100vh' }}>
         <Stats title={this.state.title} />
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
            style={{ position: 'absolute', bottom: '0', width: '100%', fontFamily: 'Droid Serif, serif' }}
          >
          <Tab label="Overview" value={0} style={{ backgroundColor:'#021526', fontFamily: 'Droid Serif, serif', fontSize: '1.6rem' }} />
          <Tab label="Upgrades" value={1} style={{ backgroundColor:'#021526', fontFamily: 'Droid Serif, serif', fontSize: '1.6rem' }} />
          <Tab label="Custom Email" value={2} style={{ backgroundColor:'#021526', fontFamily: 'Droid Serif, serif', fontSize: '1.6rem' }} disabled />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
           <Overview />
            <Upgrades />
            <div style={{ fontSize:'4rem', color:'white' }}>
              Team
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
