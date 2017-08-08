import { observable, action, toJS } from 'mobx';

class Store {
    @observable money = 0;
    @observable totalMoney = 0;
    @observable caughtProb = 0;
    @observable mailValue = {
        money: 0.10,
        // money: 100000000,
        caughtProb: 0.0001,
    };

    @observable monkeyCount = 0;
    @observable monkeyPrice = 5;
    @observable englishLessonCount = 0;
    @observable englishLessonPrice = 10;
    @observable englishLessonValue = 0.01;
    @observable marketing101Count = 0;
    @observable marketing101Price = 2;
    @observable marketing101Value = 0.1;

    // All rates are per second.
    @observable monkeyEmailRate = 1;
    @observable monkeyCaughtRate = 0.0001;
    @observable monkeyMultiplier = 1.07;
    monkeyTimer = [];

    @observable englishLessonMultiplier = 1.10;
    @observable marketing101Multiplier = 1.03;

    @observable targetedMailInProgress = false;
    @observable targetedMailDuration = 0;

    @observable themes = [
        {
            name: 'Investment Opportunity',
            available: true,
        },
        {
            name: 'Bank Interest',
            available: true,
        },
        {
            name: 'Gold',
            available: false,    
        },
    ];

    @observable ageGroups = [
        {
            name: '10~20',
            available: true,
        },
        {
            name: '21~30',
            available: true,
        },
        {
            name: '31~40',
            available: true,
        },
        {
            name: '40+',
            available: true,
        },
    ];

    @observable durations = [90, 10, 270, 360, 450, 540, 630, 720, 810, 900, 990];
    @observable duration = null;

    @observable targetedMailStepIndex = 0;
    @observable targetedMailFinished = false;
    @observable targetedMailProgress = 0;

    @action addValue = (value) => {
        this.money = Math.max(this.money + value.money, 0);
        this.caughtProb = Math.max(this.caughtProb + value.caughtProb, 0);
        this.addTotalMoney(value.money);
    }

    getThemes = () => {
        return this.themes;
    }

    getAgeGroups = () => {
        return this.ageGroups;
    }

    getDuration = (index) => {
        const duration = toJS(this.durations)[index];
        this.setDuration(duration);
        return duration;
    }

    getTargetedMailInProgress = () => {
        return this.targetedMailInProgress;
    }

    getTargetedMailInProgress = () => {
        return this.targetedMailInProgress;
    }

    getTargetedMailProgress = () => {
        return this.targetedMailProgress;
    }

    @action
    setTargetedMailProgress = (value) => {
        this.targetedMailProgress = value;
    }

    getTargetedMailStepIndex = () => {
        return this.targetedMailStepIndex;
    }

    getTargetedMailFinished = () => {
        return this.targetedMailFinished;
    }

    @action
    setDuration = (duration) => {
        this.duration = duration;
    }

    @action
    setTargetedMailStepIndex = (i) => {
        this.targetedMailStepIndex = Math.max(i, 0);
    }

    @action
    setTargetedMailFinished = (finished) => {
        this.targetedMailFinished = finished;
    }

    @action
    setTargetedMailInProgress = (inProgress) => {
        this.targetedMailInProgress = inProgress;
    }

    getTotalMoney = () => {
        let length = (Math.floor(this.totalMoney) + '').replace('.', '').length;
        if(length > 3) {
            return this.abbrNum(this.totalMoney.toFixed(2), 3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return this.totalMoney.toFixed(2).toString();
        }
    }

    getMoneyPerSecond = () => {
        return this.abbrNum((this.monkeyEmailRate * this.monkeyCount * (this.mailValue.money + this.getAddtionalValues()).toFixed(2)), 2);
    }

    @action addTotalMoney = (value) => {
        this.totalMoney = this.totalMoney + value;
    }

    @action sendManualMail = () => {
        const earned = this.mailValue.money + this.getAddtionalValues() + this.getManualAdditionalValues();
        this.money = Math.max(this.money + earned, 0);
        this.caughtProb = Math.max(this.caughtProb + this.mailValue.caughtProb, 0);
        this.addTotalMoney(earned);
    }

    @action addMonkey = (value) => {
        this.money = Math.max(this.money - this.getMonkeyPriceReal(), 0);
        this.monkeyCount = this.monkeyCount + value;
    }

    @action addEnglishLesson = (value) => {
        this.money = Math.max(this.money - this.getEnglishLessonPriceReal(), 0);
        this.englishLessonCount = this.englishLessonCount + value;
    }

    @action addMarketing101 = (value) => {
        this.money = Math.max(this.money - this.getMarketing101PriceReal(), 0);
        this.marketing101Count = this.marketing101Count + value;
    }

    getMonkeyPrice = () => {
        const monkeyPrice = this.monkeyPrice * Math.pow(this.monkeyMultiplier, this.monkeyCount);
        const length = (Math.floor(monkeyPrice) + '').replace('.', '').length;
        if(length > 3) {
            return this.abbrNum(monkeyPrice.toFixed(2), 3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return (monkeyPrice).toFixed(2);
        }
    }

    getMonkeyPriceReal = () => {
         return this.monkeyPrice * Math.pow(this.monkeyMultiplier, this.monkeyCount);
    }

    getEnglishLessonPrice = () => {
        const englishLessonPrice = this.englishLessonPrice * Math.pow(this.englishLessonMultiplier, this.englishLessonCount);
        const length = (Math.floor(englishLessonPrice) + '').replace('.', '').length;
        if(length > 3) {
            return this.abbrNum(englishLessonPrice.toFixed(2), 3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return (englishLessonPrice).toFixed(2);
        }
    }

    getEnglishLessonPriceReal = () => {
        return this.englishLessonPrice * Math.pow(this.englishLessonMultiplier, this.englishLessonCount);
    }

    getMarketing101Price = () => {
        const marketingPrice = this.marketing101Price * Math.pow(this.marketing101Multiplier, this.marketing101Count);
        const length = (Math.floor(marketingPrice) + '').replace('.', '').length;
        if(length > 3) {
            return this.abbrNum(marketingPrice.toFixed(2), 3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return (marketingPrice).toFixed(2);
        }
    }

    getMarketing101PriceReal = () => {
        return this.marketing101Price * Math.pow(this.marketing101Multiplier, this.marketing101Count);
    }

    // multiply every timer by 0.1 to make it per second.
    monkeyTimer = () => {
        // this.sleep(1000).then(() => {
            this.addValue({money: 0.1 * this.monkeyEmailRate * this.monkeyCount * (this.mailValue.money + this.getAddtionalValues()), caughtProb: 0.25 * this.monkeyCaughtRate * this.monkeyCount});
        // })
    }

    getAddtionalValues = () => {
        return this.englishLessonCount * this.englishLessonValue;
    }

    getManualAdditionalValues = () => {
        return this.marketing101Count * this.marketing101Value;
    }

    getMoney = () => {
        let length = (Math.floor(this.money) + '').replace('.', '').length;
        if(length > 3) {
            return this.abbrNum(this.money.toFixed(2), 3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return this.money.toFixed(2).toString();
        }
    }

    abbrNum = (number, decPlaces) => {
    // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10,decPlaces);
        // Enumerate number abbreviations
        var abbrev = [ "k", "m", "b", "t" ];
        number = parseFloat(number).toFixed(2);

        // Go through the array backwards, so we do the largest first
        for (var i=abbrev.length-1; i>=0; i--) {

            // Convert array index to "1000", "1000000", etc
            var size = Math.pow(10,(i+1)*3);

            // If the number is bigger or equal do the abbreviation
            if(size <= number) {
                // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                // This gives us nice rounding to a particular decimal place.
                number = (Math.round(number*decPlaces/size)/decPlaces).toFixed(2);

                // Handle special case where we round up to the next abbreviation
                if((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }

                // Add the letter for the abbreviation
                number += abbrev[i];

                // We are done... stop
                break;
            }
        }
        return number;
    }

    sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

export default new Store();