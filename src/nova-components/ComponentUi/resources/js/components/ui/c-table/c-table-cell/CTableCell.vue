<template>
    <td>
        <template v-if="isTextCell">
            <span :class="cell.cssClass">
                {{ getValue }}
            </span>
        </template>

        <template v-else-if="isActionCell">
            <a class="c-table-action" :class="cell.cssClass" @click="actionClicked">{{ getActionText }}</a>
        </template>

        <template v-else>
            -
        </template>
    </td>
</template>

<script>
export default {
    name: 'c-table-cell',
    props: {
        cell: {
            type: Object,
            required: true
        },
        row: {
            type: Object,
            default: null
        }
    },
    computed: {
        isTextCell() {
            return this.cell.type.toLowerCase() === 'text'
        },

        isActionCell() {
            return this.cell.type.toLowerCase() === 'action'
        },

        getFieldValue(){
            if(this.fieldValue) return this.fieldValue;
            return '-'
        },

        getActionText() {
            if(typeof this.cell.actionText === 'string') return this.cell.actionText;
            if(this.cell.actionText instanceof Function) return this.cell.actionText(this.row);
            return ''
        },

        getValue() {
            if(this.cell.type === 'text' && this.cell.field){
                if(this.row && this.row[this.cell.field]) return this.row[this.cell.field];
            }
            return '-'
        }
    },
    methods: {
        actionClicked() {
            if(!this.cell || !this.cell.actionHandler) return
            if(!this.cell.actionHandler instanceof Function) throw 'actionHandler should be instance of Function'

            this.cell.actionHandler(this.row)
        },
    },
}
</script>
