<template>
    <td>
        <span v-if="isTextCell" :class="cell.cssClass">
            {{ getValue }}
        </span>

        <a 
            v-else-if="isActionCell" 
            class="c-table-action" 
            :class="cell.cssClass" 
            @click="actionClicked">{{ getActionText }}</a>

        <span v-else>
            -
        </span>
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
