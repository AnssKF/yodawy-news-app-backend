
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
            } = resource;

            const { previewUrl: avatar } = resource.fields.find(_ => _.name === 'Avatar')
            
            return [...acc, {display, value, avatar}]
        }, [])

        return users;
    }

}