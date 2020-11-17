<template>
  <div class="paginator">
        <a :class="getPrevClassList" @click="handelOnPrev">&laquo; Previous</a>
        <a :class="getNextClassList" @click="handelOnNext">Next &raquo;</a>
    </div>
</template>

<script>
import './Paginator.css'
export default {
    name: 'paginator',
    props: {
        disabledPrevioud: {
            type: Boolean,
            default: null
        },
        disabledNext: {
            type: Boolean,
            default: null
        },
        onNext: {
            type: Function,
            default: null
        },
        onPrevious: {
            type: Function,
            default: null
        }
    },
    computed: {
        getPrevClassList() {
            return {
                'paginator-btn': true,
                'disabled': this.disabledPrevioud
            }
        },

        getNextClassList() {
            return {
                'paginator-btn': true,
                'disabled': this.disabledNext
            }
        }
    },
    methods: {
        handelOnPrev() {
            if(this.onPrevious === null || this.disabledPrevioud) return
            if(! this.onPrevious instanceof Function) throw 'onPrevioes Prop should be instance of Function';
            this.onPrevious()
        },

        handelOnNext() {
            if(this.onNext === null || this.disabledNext) return
            if(! this.onNext instanceof Function) throw 'onPrevioes Prop should be instance of Function';
            this.onNext()
        }
    }
}
</script>