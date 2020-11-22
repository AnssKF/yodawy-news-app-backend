import MyFavoritesStore from './modules/myfavorite-store';

export function registerStoreModules(store){
    store.registerModule('MyFavsStore', MyFavoritesStore)
}