<template>
    <div class="c-ff-group">
        <input v-bind="$attrs" ref="inputfield" @blur="blurHandler" @input="inputHandler" :value="value"/>
        <span class="bar"></span>
        <label :class="getLabelClass">
            <slot></slot>
        </label>

        <span v-if="danger" class="help-text text-danger">{{ helpText }}</span>
    </div>
</template>

<script>
import './FormField.css';

export default {
    name: 'form-field',
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
            /**
             * Help Text to be display on danger value
             */
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
            /**
             * Any extra data to be passed to form field .. Its added to each output event on-blur | on-input
             */
            type: Object,
            default: {}
        },
        cKey: {
            /**
             * Key to be unique to identify form field events
             */
            type: String,
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
            $event.key = this.cKey
            this.onBlur($event)
        },

        inputHandler($event) {
            if(!this.onInput && !(this.onInput instanceof Function)) return

            $event.extras = this.extras
            $event.key = this.cKey
            this.onInput($event)
        }
    },
}
</script>