<template>
    <tr :class="getFavItemClassList" v-if="getFavField('id') !== '-'">
        <td>{{ getFavField('id') }}</td>
        <td>{{ getFavField('url') }}</td>
        <td>{{ getFavField('publishedAt') }}</td>
        <td>{{ getFavField('user') }}</td>
        <td>
            <a class="fav-posted-action" @click="togglePosted">{{ getFavPostActionName }}</a>
        </td>
    </tr>
</template>

<script>
import './FavItemRow.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'fav-item-row',
    props: {
        fav: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters('MyFavsStore', ['getAvailableStatuses']),

        getFavPostActionName() {
            const STATUS = this.getAvailableStatuses;

            if(this.fav && this.fav.status && this.fav.status.id && STATUS.POSTED)
                return this.fav.status.id === STATUS.POSTED ? 'Unpost': 'Post';
            else 
                return ''
        },

        getFavItemClassList() {
            const STATUS = this.getAvailableStatuses;
            let posted = false;
            if(this.fav && this.fav.status && this.fav.status.id && STATUS.POSTED) {
                posted = this.fav.status.id === STATUS.POSTED
            }

            return {
                'fav-item': true,
                'posted': posted
            }
        }
    },
    methods: {
        ...mapActions('MyFavsStore', ['toggleFavPostedStatus']),

        getFavField(field){
            if(this.fav && this.fav[field] && this.fav[field].value) return this.fav[field].value
            else return '-'
        },

        togglePosted() {
            if(this.fav && this.fav.id){
                this.toggleFavPostedStatus(this.fav.id)
                    .then(() => {
                        const STATUS = this.getAvailableStatuses;
                        if(this.fav && this.fav.status && this.fav.status.id && STATUS.POSTED){
                            Nova.success(this.fav.status.id === STATUS.POSTED ? 'Posted': 'Unposted')
                        }
                    })
                    .catch(() => Nova.error('Error'))
            }
        }
    },
}
</script>