import { observable } from 'mobx';
import mobx from 'mobx';

class Store {
    @observable money = 0;
}

export default new Store();