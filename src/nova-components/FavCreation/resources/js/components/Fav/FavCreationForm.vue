<template>
    <div class="c-fav-creation-form">

        <form @submit.prevent="handleSubmit">

            <c-card title="Create Fav">

                <!-- URL -->
                <div class="c-form-field-wrapper c-border-bottom">
                    <form-field 
                        :value="getUrlField.value"
                        :on-input="setValue"
                        :on-blur="setTouched"
                        :danger="showUrlErrorMessage"
                        c-key="url"
                        id="url" 
                        type="text" 
                        placeholder="URL of headline from newsapi.org"
                        help-text="Please enter a valid URL."
                    >URL</form-field>
                </div>
                <!-- ./URL -->

                <!-- PublishedAt -->
                <div class="c-form-field-wrapper c-border-bottom">
                    <form-field 
                        :value="getPublishedAtField.value"
                        :on-input="setValue"
                        :on-blur="setTouched"
                        :danger="showPublishedAtErrorMessage"
                        c-key="publishedAt"
                        id="publishedAt" 
                        type="date" 
                        placeholder="Headline publish date"
                        help-text="Please enter a valid date yyyy-mm-dd."
                    >Published At</form-field>
                </div>
                <!-- ./PublishedAt -->

                <!-- Author -->
                <div class="c-form-field-wrapper c-border-bottom">
                    <form-field 
                        :value="getAuthorField.value"
                        :on-input="validateAndSetAuthorValue"
                        :on-blur="setTouched"
                        :danger="invalidAuthor"
                        c-key="author"
                        id="getAuthorField" 
                        type="text" 
                        placeholder="Name of Author"
                        help-text="Author accepts only english litters."
                    >Author</form-field>
                </div>
                <!-- ./Author -->

                <!-- USER -->
                <div class="c-form-field-wrapper c-border-bottom">

                    <!-- Selected User -->
                    <div class="selected-user">
                        <span>User{{ getSelectedUserName }}</span>
                    </div>
                
                    <!-- SearchUsers -->
                    <div class="search-users">
                        
                        <!-- SearchField -->
                            <form-field 
                                :value="getUserSearch"
                                :on-input="handleSearchUser"
                                :on-blur="setTouched"
                                :danger="showUserErrorMessage"
                                c-key="user"
                                id="searchUsers" 
                                type="text" 
                                placeholder="Search by username or email"
                                help-text="Please select a valid user."
                            >Select User</form-field>
                        <!-- ./SearchField -->

                        <div class="c-search-options">
                            
                            <!-- Resultoption -->
                            <div v-for="user in getAvailableUsers" :key="user.value" @click="selectUser(user)"
                                class="search-option-wrapper">
                                <div class="search-option">
                                    <div class="search-option__avatar">
                                        <img :src="user.avatar">
                                    </div> 
                                    <div class="search-option__display">
                                        {{ user.display }}
                                    </div>
                                </div>
                            </div>

                            <div class="search-option-wrapper" v-if="noSearchResults">
                                <div class="search-option">
                                    <div>
                                        <div class="search-option__display danger">
                                            There is no user exist.
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <!-- ./Resultoption -->

                        </div>
                    </div>
                    <!-- ./SearchUsers -->
                
                </div>
                <!-- ./USER -->

                <div class="c-form-footer">
                    <c-btn
                        :on-click="resetFavForm"
                        style-type="danger"
                        type="button"
                        class="clear-btn"> X </c-btn>
                    
                    <c-btn
                        :disabled="submitDisabled"
                        type="submit">Create Fav</c-btn>
                </div>
            </c-card>

        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// Styles
import './FavCreationForm.css'

export default {
    name: 'FavCreationForm',

    computed: {
        ...mapGetters('UserStore', ['getAvailableUsers']),
        ...mapGetters('FavStore', ['getUserSearch', 'getUrlField', 'getPublishedAtField', 'getUserField', 'getAuthorField', 'invalidUrl', 'invalidPublishedAt', 'invalidUser', 'invalidAuthor']),

        showUrlErrorMessage() {
            return this.invalidUrl && this.getUrlField.touched && this.getUrlField.value !== ''
        },

        showPublishedAtErrorMessage() {
            return this.invalidPublishedAt && this.getPublishedAtField.touched && this.getPublishedAtField.value !== ''
        },

        showUserErrorMessage() {
            return this.invalidUser && this.getUserField.touched && this.getUserField.value !== ''
        },

        getSelectedUserName() {
            return this.getUserField.display ? `: ${this.getUserField.display}`: ''
        },
        
        submitDisabled() {
            return this.invalidUrl || this.invalidPublishedAt || this.invalidUser
        },

        noSearchResults() {
            return this.getAvailableUsers.length === 0 && this.getUserSearch !== ''
        }
    },

    methods: {
        ...mapActions('UserStore', ['fetchUsers']),
        ...mapActions('FavStore', ['addFav', 'updateFavFormField', 'resetFavForm', 'validateAndSetAuthorValue']),

        handleSubmit() {
            this.addFav()
                .then(() => Nova.success('Created'))
                .catch(() => Nova.error('Error'));
        },

        async handleSearchUser($e) {
            this.updateFavFormField({ field: 'user', attr: 'userSearch', value: $e.target.value })

            try{
                await this.fetchUsers(this.getUserSearch)
            }catch(e) {
                Nova.error('Error searching for user')
            }
        },

        selectUser(availableUser) {
            /**
             * When select user update form field values, 
             * Fetch Users with empty string cancel old requests and resets availableUsers state
             */
            this.updateFavFormField({ field: 'user', attr: 'value', value: availableUser.value })
            this.updateFavFormField({ field: 'user', attr: 'display', value: availableUser.display })
            this.updateFavFormField({ field: 'user', attr: 'userSearch', value: '' })
            this.fetchUsers('')
        },

        setTouched($e) {
            /**
             * Set Form field as touched to display error messages.
             * 
             * @param 
             *  - $e: FormField :on-input event that has 'key' property with form field name 
             */
            this.updateFavFormField({ field: $e.key, attr: 'touched', value: true })
        },

        setValue($e) {
            /**
             * Update FavForm state with form values
             * @param 
             *  - $e: FormField :on-input event that has 'key' property with form field name 
             */
            this.updateFavFormField({ field: $e.key, attr: 'value', value: $e.target.value })
        }
    }
}
</script>