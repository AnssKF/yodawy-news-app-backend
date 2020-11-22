<template>
    <tr>
        <th v-for="(header, index) in getHeaders" :key="index">{{ header }}</th>
    </tr>
</template>

<script>
import './CTableHeader.css'
export default {
    name: 'c-table-header',
    props: {
        headers: {
            type: Array,
            default: []
        }
    },
    computed: {
        getHeaders() {
            if(this.headers && this.headers instanceof Array) return this.headers;
            return []
        }
    },
}
</script>

<style>

</style>