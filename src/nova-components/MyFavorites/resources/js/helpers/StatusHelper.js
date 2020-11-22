
export class StatusHelper { 
    
    static parseStatusesResource(resources) {
        const statuses = resources.reduce((resourceAcc, resource) => {

            const status = resource.fields.reduce((fieldAcc, field) => {
                let attr = field.attribute === 'ComputedField' ? field.name.toLowerCase() : field.attribute;
                let value = { value: field.value }
                if( field.belongsToRelationship && field.belongsToId ) {
                    value['id'] = field.belongsToId
                }
                return { ...fieldAcc, [attr]: value }
            }, {})

            if(status && status.name && status.name.value && status.id && status.id.value)
                return {...resourceAcc, [status.name.value.toUpperCase()]: status.id.value}
            else
                return resourceAcc
        }, {})

        return statuses;
    }

}