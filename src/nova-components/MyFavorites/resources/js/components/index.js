import MyFavorites from './MyFavorites/MyFavorites.vue';

export const registerComponents = (Vue) => {
    const components = [
        MyFavorites
    ];

    components.forEach( component => Vue.component(component.name, component));
}