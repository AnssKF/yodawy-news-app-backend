<template>
  <div class="paginator">
        <a class="paginator-btn previous" :class="getPrevClassList" @click="handelOnPrev">&laquo; Previous</a>
        <a class="paginator-btn next" :class="getNextClassList" @click="handelOnNext">Next &raquo;</a>
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
                'paginator-btn previous': true,
                'disabled': this.disabledPrevioud
            }
        },

        getNextClassList() {
            return {
                'paginator-btn next': true,
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