<template>
    <div class="c-ff-group mb-2 mt-4">
        <input v-bind="$attrs" ref="inputfield" @blur="$emit('blur')" @input="$emit('input', $refs.inputfield.value)" :value="value"/>
        <span class="bar"></span>
        <label :class="!!danger? 'text-danger': 'text-primary'">
            <slot></slot>
        </label>

        <span v-if="!!danger" class="mt-2 text-danger help-text">{{ helpText }}</span>
    </div>
</template>

<script>
export default {
    name: 'FormField',
    props: ['value', 'danger', 'help-text']
}
</script>

<style scoped>
 @import './FormField.css';
</style>
