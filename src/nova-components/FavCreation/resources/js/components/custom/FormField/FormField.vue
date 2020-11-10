<template>
    <div class="c-ff-group">
        <input v-bind="$attrs" ref="inputfield" @blur="blurHandler" @input="inputHandler" :value="value"/>
        <span class="bar"></span>
        <label :class="getLabelClass">
            <slot></slot>
        </label>

        <span v-if="danger" class="help-text">{{ helpText }}</span>
    </div>
</template>

<script>
import './FormField.css';

export default {
    name: 'FormField',
    props: {
        value: {
            type: String,
            default: ''
        },
        danger: {
            type: Boolean,
            default: false
        },
        helpText: {
            type: String,
            default: 'Please insert a valid data.'
        },
        onBlur: {
            type: Function,
            default: null
        },
        onInput: {
            type: Function,
            default: null
        },
        extras: {
            type: Object,
            default: {}
        }
    },

    computed: {
        getLabelClass() {
            return this.danger? 'text-danger': 'text-primary';
        }
    },

    methods: {
        blurHandler($event) {
            if(!this.onBlur && !(this.onBlur instanceof Function)) return

            $event.extras = this.extras
            this.onBlur($event)
        },

        inputHandler($event) {
            if(!this.onInput && !(this.onInput instanceof Function)) return

            $event.extras = this.extras
            this.onInput($event)
        }
    },
}
</script>