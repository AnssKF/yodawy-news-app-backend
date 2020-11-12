import FormField from './form/form-field/FormField.vue';
import CCard from './ui/c-card/CCard.vue'

export const registerComponents = (Vue) => {
    const components = [
        FormField,
        CCard
    ];

    components.forEach( component => Vue.component(component.name, component));
}