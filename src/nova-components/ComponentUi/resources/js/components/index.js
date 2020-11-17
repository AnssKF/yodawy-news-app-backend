import FormField from './form/form-field/FormField.vue';
import CCard from './ui/c-card/CCard.vue';
import CBtn from './ui/c-btn/CBtn.vue';
import Paginator from './ui/paginator/Paginator.vue'

export const registerComponents = (Vue) => {
    const components = [
        FormField,
        CCard,
        CBtn,
        Paginator
    ];

    components.forEach( component => Vue.component(component.name, component));
}