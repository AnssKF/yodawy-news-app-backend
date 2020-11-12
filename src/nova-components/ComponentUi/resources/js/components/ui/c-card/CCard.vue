<template>
    <div class="c-card">

        <slot name="c-card-title">
            <div class="c-card__title-wrapper c-card__title__border-left">
                <h2 class="c-card__title">{{ title }}</h2>
            </div>
        </slot>

        <slot></slot>

    </div> <!-- ./card -->
</template>

<script>
import './CCard.css'
export default {
    name: 'c-card',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>