<template>
    <div class="date-range-filter">
        <div class="date-field">
            <form-field
                type="date"
                :on-input="handleInput"
                :value="from"
                c-key="dateFrom"
            >
            {{ getFromLabel }}
            </form-field>
        </div>
        <div class="date-field">
            <form-field
                type="date"
                :on-input="handleInput"
                :value="to"
                c-key="dateTo"
            >
            {{ getToLabel }}
            </form-field>
        </div>
    </div>
</template>

<script>
import './DateRangeFilter.css'
export default {
    name: 'date-range-filter',
    data() {
        return {
            from: '',
            to: ''
        }
    },
    props: {
        onChangeValues: {
            type: Function,
            default: null
        },
        fromLabel: {
            type: String,
            default: 'Date From'
        },
        fromValue: {
            type: String,
            default: ''
        },
        toValue: {
            type: String,
            default: ''
        },
        toLabel: {
            type: String,
            default: 'Date To'
        },
    },
    computed: {
        getFromLabel() {
            if(this.fromLabel && typeof this.fromLabel === 'string') return this.fromLabel;
            return 'Date From';
        },

        getFromValue() {
            if(this.fromValue && typeof this.fromValue === 'string') return this.fromValue;
            return '' 
        },

        getToLabel() {
            if(this.toLabel && typeof this.toLabel === 'string') return this.toLabel;
            return 'Date To';
        },

        getToValue() {
            if(this.toValue && typeof this.toValue === 'string') return this.toValue;
            return '' 
        },
    },
    methods: {
        handleInput($e) {
            if(this.onChangeValues === null) return
            if(!this.onChangeValues instanceof Function) throw 'onChangeValues prop should be instance of Function';
            
            const value = $e.target.value;
            if( value !== '' && !moment(value, 'YYYY-MM-DD', true).isValid()) return 

            const key = $e.key;
            if(key === 'dateFrom') this.from = value;
            if(key === 'dateTo') this.to = value;

            this.onChangeValues({ from: this.from, to: this.to });
        }
    },
    mounted() {
        this.from = this.getFromValue;
        this.to = this.getToValue;
    },
}
</script>
