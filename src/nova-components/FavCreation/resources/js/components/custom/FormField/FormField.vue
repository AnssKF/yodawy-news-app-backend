<template>
    <div class="c-ff-group">
        <input v-bind="$attrs" ref="inputfield" @blur="$emit('blur')" @input="$emit('input', $refs.inputfield.value)" :value="value"/>
        <span class="bar"></span>
        <label :class="danger? 'text-danger': 'text-primary'">
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
        'danger': {
            type: Boolean,
            default: false
        },
        'help-text': {
            type: String,
            default: 'Please insert a valid data.'
        },
    }
}
</script>