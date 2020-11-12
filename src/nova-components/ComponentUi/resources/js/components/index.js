export const registerComponents = (Vue) => {
    const components = [
    ];

    components.forEach( component => Vue.component(component.name, component));
}