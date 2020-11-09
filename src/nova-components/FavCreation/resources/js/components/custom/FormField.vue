<template>
    <div class="group mb-2 mt-4">
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

.group {
    position: relative;
}

input {
    font-size: 1rem;
    padding: 5px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #757575;
}

input:focus {
    outline: none;
}

label {
    /* color: #999; */
    font-size: 1rem;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 0px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
}

input:focus~label,
input:valid~label {
    top: -15px;
    font-size: 14px;
    /* color: var(--primary); */
}

.bar {
    position: relative;
    display: block;
}

.bar:before,
.bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    background: var(--primary);
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
}

.bar:before {
    left: 50%;
}

.bar:after {
    right: 50%;
}

input:focus~.bar:before,
input:focus~.bar:after {
    width: 50%;
}

</style>
