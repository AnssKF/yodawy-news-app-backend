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
import { STATUS } from '../../helpers/StatusHelper';

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
            return this.fav.status.id === STATUS.POSTED ? 'Unpost': 'Post';
        },

        getFavItemClassList() {
            return {
                'fav-item': true,
                'posted': this.fav.status.id === STATUS.POSTED
            }
        }
    },
    methods: {
        ...mapActions('MyFavsStore', ['toggleFavPostedStatus']),

        getFavField(field){
            if(this.fav && this.fav[field]) return this.fav[field].value
            return '-'
        },

        togglePosted() {
            if(this.fav && this.fav.id){
                this.toggleFavPostedStatus(this.fav.id)
                    .then(() => {
                        if(this.fav && this.fav.status){
                            Nova.success(this.fav.status.id === STATUS.POSTED ? 'Posted': 'Unposted')
                        }
                    })
                    .catch(() => Nova.error('Error'))
            }
        }
    },
}
</script>