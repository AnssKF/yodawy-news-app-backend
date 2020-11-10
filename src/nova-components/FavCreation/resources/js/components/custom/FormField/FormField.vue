<template>
    <div class="c-ff-group">
        <input v-bind="$attrs" ref="inputfield" v-on="onBlur? {blur: onBlur}: null" @input="$emit('input', $refs.inputfield.value)" :value="value"/>
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
            type: Function
        }
    },

    computed: {
        getLabelClass() {
            return this.danger? 'text-danger': 'text-primary';
        }
    },
}
</script>