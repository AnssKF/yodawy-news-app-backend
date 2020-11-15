<template>
    <button 
        @click="handleOnClick"
        v-bind="$attrs"
        class="c-btn"
        :class="getBtnStyle">
        
        <slot>Submit</slot>
    </button>
</template>

<script>
import './CBtn.css';

export default {
    name: 'c-btn',
    props: {
        styleType: {
            type: String,
            default: 'primary',
            validator: function (value) {
                return ['primary', 'danger'].indexOf(value) !== -1
            }
        },
        onClick: {
            type: Function,
            default: null
        }
    },
    computed: {
        getBtnStyle() {
            return this.styleType === 'danger'? 'btn-danger': 'btn-primary';
        }
    },
    methods: {
        handleOnClick($event){
            if(this.onClick === null) return

            if(!(this.onClick instanceof Function)) throw ('onClick prop should be instance of Function')

            this.onClick($event)
        }
    }
}
</script>