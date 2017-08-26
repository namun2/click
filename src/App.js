import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import  NotificationSystem  from 'react-notification-system';
import { OrderedSet } from 'immutable';
import { NotificationStack } from 'react-notification';
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
    notifications: OrderedSet(),
    count: 0,
  };

  titleArray = ['Overview', 'Upgrades', 'Team'];

  addNotification = (message) => {
    this._notificationSystem.addNotification({
      message: message,
      level: 'success',
      autoDismiss: 0,
    });
  }

   componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
      title: this.titleArray[value],
    });
  };

  handleToggle = () => this.setState({open: !this.state.open});

  //    addNotification = (title, message) => {
  //   const { notifications, count } = this.state;
  //   const id = notifications.size + 1;
  //   const newCount = count + 1;
  //   return this.setState({
  //     count: newCount,
  //     notifications: notifications.add({
  //       title: title,
  //       message: message,
  //       key: newCount,
  //       action: 'Dismiss',
  //       dismissAfter: 1000000,
  //       onClick: () => this.removeNotification(newCount),
  //     })
  //   });
  // }

  removeNotification = (count) => {
    const { notifications } = this.state;
    this.setState({
      notifications: notifications.filter(n => n.key !== count)
    })
  }

  render() {

var style = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level

    },

    success: { // Applied only to the success notification item
    }
  }
}

    return (
       <MuiThemeProvider>
        <div className="App" style={{ backgroundColor: '#021526', height: '100vh' }}>
          <NotificationSystem ref="notificationSystem" style={style} />
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
           <Overview addNotification={this.addNotification}/>
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
