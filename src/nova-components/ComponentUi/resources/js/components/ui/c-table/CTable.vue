<template>
    <table class="c-table">
        <c-table-header :headers="headers"/>

        <template v-for="(row, index) in getData">
            <c-table-row :key="index" :row-data="row" :tr-class="trClass" :cells="cells"></c-table-row>
        </template>

    </table>
</template>

<script>
import './CTable.css';
export default {
    name: 'c-table',
    data() {
        return {
            headers: [],
            cells: []
        }
    },
    props: {
        columns: {
            type: Array,
            default: []
        },
        data: {
            type: Array,
            default: []
        },
        trClass: {
            type: [Object, String, Function],
            default: {}
        }
    },
    computed: {
        getData() { 
            if(this.data && this.data instanceof Array) return this.data;
            return []
        },
    },
    mounted() {
        const [cells, headers] = this.columns.reduce((acc, column) => {
            const { cell, header } = column;

            const [ cellsAcc = [], headersAcc = [] ] = acc;
            return [[...cellsAcc, cell], [...headersAcc, header]]
        }, [[], []]);

        this.headers = headers;
        this.cells = cells;
    },
}
</script>

<style>

</style>