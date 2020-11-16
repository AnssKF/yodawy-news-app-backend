
export class UsersHelper {
    
    static parseUserResources(resources) {
        /**
         * Parse nova-api/users 
         * 
         * @param 
         * - nova-api/users response.resources
         * 
         * @returns
         * - users array with {value, display, avatar} 
         */
        const users = resources.reduce((acc, resource) => {
            const { 
                title: display, 
                id: {value: value}, 
                fields: [, {previewUrl: avatar}]
            } = resource;

            return [...acc, {display, value, avatar}]
        }, [])

        return users;
    }

}