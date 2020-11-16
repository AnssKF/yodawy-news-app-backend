import FavStore from './modules/favorite-store';
import UserStore from './modules/user-store';

export function registerStoreModules(store){
    store.registerModule('FavStore', FavStore)
    store.registerModule('UserStore', UserStore)
}