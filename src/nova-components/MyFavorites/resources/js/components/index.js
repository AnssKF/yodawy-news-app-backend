import MyFavorites from './MyFavorites/MyFavorites.vue';
import FavItemRow from './FavItem/FavItemRow.vue';
import FavDateFilter from './FavDateFilter/FavDateFilter.vue';

export const registerComponents = (Vue) => {
    const components = [
        MyFavorites,
        FavItemRow,
        FavDateFilter
    ];

    components.forEach( component => Vue.component(component.name, component));
}