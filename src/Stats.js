import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { observer } from 'mobx-react';
import Store from './Store';

@observer
export default class Stats extends Component {

    static PropTypes = {
        title: React.PropTypes.string.isRequired,
    }

  state = {
    open: false,
  };

  handleToggle = () => this.setState({open: !this.state.open});

    render () {
        return (
        <div>
            <AppBar
                style={{ backgroundColor: '#021526', position: 'absolute' }}
                onLeftIconButtonTouchTap={() => this.handleToggle()}
                title={this.props.title}
            />
                <Drawer width={200}  open={this.state.open} containerStyle={{ backgroundColor: 'rgb(101, 148, 165)' }} >
                    <AppBar
                        title="Stats"
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        style={{ backgroundColor: '#021526' }}
                        onLeftIconButtonTouchTap={() => this.handleToggle()}
                        titleStyle={{ fontFamily: 'Droid Serif, serif' }}
                    />
                    <div style={{ fontFamily: 'Droid Serif, serif', fontWeight: '600' }}>
                        <p>Total $ earned: ${Store.getTotalMoney()}</p>
                        <p>$ per second: ${Store.getMoneyPerSecond()}</p>
                    </div>
                </Drawer>
        </div>
        );
    }
}