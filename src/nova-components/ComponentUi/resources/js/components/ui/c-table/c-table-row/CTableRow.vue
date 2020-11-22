<template>
    <tr :class="getTrClass">
        <template v-for="(cell, index) in getCells">
            <c-table-cell :cell="cell" :key="index" :row="getRowData" :field-value="getValue(cell)"/>
        </template>
    </tr>
</template>

<script>
import './CTableRow.css'
export default {
    name: 'c-table-row',
    props: {
        rowData: {
            type: Object,
            default: null
        },
        cells: {
            type: Array,
            required: true,
            default: []
        },
        trClass: {
            type: [Object, String, Function],
            default: {}
        }
    },
    computed: {
        getRowData() {
            if(this.rowData && this.rowData instanceof Object) return this.rowData;
            return {}
        },

        getCells() {
            if(this.cells && this.cells instanceof Array) return this.cells;
            return []
        },
        getTrClass() {
            if(typeof this.trClass === 'function') return this.trClass(this.getRowData);
            if(typeof this.trClass === 'string' || this.trClass instanceof Object) return this.trClass;
            else {
                throw 'trClass should be String or Instance of Object';
            }
        }
    },
    methods: {
        getValue(cell) {
            if(cell.type === 'text' && cell.field){
                const data = this.getRowData;
                if(data[cell.field]) return data[cell.field];
            }
            return '-'
        }
    },
}
</script>

<style>

</style>