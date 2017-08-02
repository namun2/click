import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import './App.css';
import Overview from './Overview';
import Upgrades from './Upgrades';

class App extends Component {
  
  state = {
    slideIndex: 0,
  };


  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
       <MuiThemeProvider>
        <div className="App" style={{ backgroundColor: '#021526', height: '100vh' }}>
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
            style={{ position: 'absolute', bottom: '0', width: '100%', fontFamily: 'Droid Serif, serif' }}
          >
          <Tab label="Overview" value={0} style={{ backgroundColor:'#021526', fontFamily: 'Droid Serif, serif', fontSize: '1.6rem' }} />
          <Tab label="Upgrades" value={1} style={{ backgroundColor:'#021526', fontFamily: 'Droid Serif, serif', fontSize: '1.6rem' }} />
          <Tab label="Team" value={2} style={{ backgroundColor:'#021526', fontFamily: 'Droid Serif, serif', fontSize: '1.6rem' }} />
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
