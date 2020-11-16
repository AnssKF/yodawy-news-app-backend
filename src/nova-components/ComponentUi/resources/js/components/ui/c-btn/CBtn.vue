<template>
    <button 
        @click="handleOnClick"
        v-bind="$attrs"
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
            return {
                'c-btn': true,
                'btn-danger': this.styleType === 'danger',
                'btn-primary': this.styleType === 'primary' 
            }
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