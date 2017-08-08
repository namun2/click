import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Upgrade from './Upgrade';
import Store from './Store';
import { observer } from 'mobx-react';

@observer
export default class Upgrades extends Component {
    render () {
         return (
             <div style={{ paddingTop: '6rem' }}>
                <Upgrade title="Email Marketing 101" description="Better understand the needs of your customers. Earn additional $0.05 per email sent by YOU." price={Store.getMarketing101Price()} count={Store.marketing101Count} purchase={() => Store.addMarketing101(1)} quote="I am DR. Bakare Tunde, the cousen Of Nigerian Astronot, Air Force Major Abacha Tunde." />
                <Upgrade title="Hire Monkey" description="Hire a monkey to send your mails. Sends 1 email per second." price={Store.getMonkeyPrice()} count={Store.monkeyCount} purchase={() => Store.addMonkey(1)} quote="We've all heard that a million monkeys banging on a million typewriters will eventually reproduce the entire works of Shakespeare." />                 
                <Upgrade title="English Lesson" description="Improve you and your staff's English skills. Earn additional $0.01 per email." price={Store.getEnglishLessonPrice()} count={Store.englishLessonCount} purchase={() => Store.addEnglishLesson(1)} quote="I am DR. Bakare Tunde, the cousen Of Nigerian Astronot, Air Force Major Abacha Tunde." />
                    
            </div>
         );
    }
}