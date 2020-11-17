<template>
    <tr :class="getFavItemClassList">
        <td>{{ fav.id }}</td>
        <td>{{ fav.url }}</td>
        <td>{{ fav.publishedAt }}</td>
        <td>{{ fav.user }}</td>
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

        togglePosted() {
            this.toggleFavPostedStatus(this.fav.id)
                .then(() => Nova.success(this.fav.posted? 'Posted': 'Unposted'))
                .catch(() => Nova.error('Error'))
        }
    },
}
</script>