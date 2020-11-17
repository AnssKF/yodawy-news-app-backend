<template>
    <tr :class="getFavItemClassList">
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
import { mapActions } from 'vuex';

export default {
    name: 'fav-item-row',
    props: {
        fav: {
            type: Object,
            required: true
        }
    },
    computed: {
        getFavPostActionName() {
            return this.fav.posted ? 'Unpost': 'Post';
        },

        getFavItemClassList() {
            return {
                'fav-item': true,
                'posted': this.fav.posted
            }
        }
    },
    methods: {
        ...mapActions('MyFavsStore', ['toggleFavPostedStatus']),

        getFavField(field){
            if(this.fav && this.fav[field]) return this.fav[field]
            return '-'
        },

        togglePosted() {
            if(this.fav && this.fav.id){
                this.toggleFavPostedStatus(this.fav.id)
                    .then(() => Nova.success(this.fav.posted? 'Posted': 'Unposted'))
                    .catch(() => Nova.error('Error'))
            }
        }
    },
}
</script>