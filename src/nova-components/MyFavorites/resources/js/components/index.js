import MyFavorites from './MyFavorites/MyFavorites.vue';
import FavItemRow from './FavItem/FavItemRow.vue';

export const registerComponents = (Vue) => {
    const components = [
        MyFavorites,
        FavItemRow
    ];

    components.forEach( component => Vue.component(component.name, component));
}