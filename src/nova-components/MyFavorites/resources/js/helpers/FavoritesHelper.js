
export class FavoritesHelper {

    static parseFavoritesResources(resources) {
        const favs = resources.reduce((oldFavsAcc, currentResource) => {
            const fav = currentResource.fields.reduce((oldFieldsAcc, currentField) => {
                let attr = currentField.attribute === 'ComputedField' ? currentField.name.toLowerCase() : currentField.attribute;

                if (attr.indexOf('.') !== -1) {
                    const split = attr.split('.')
                    attr = split[split.length - 1]
                }

                let value = {value: currentField.value}
                if( currentField.belongsToRelationship && currentField.belongsToId ) {
                    value['id'] = currentField.belongsToId
                }

                return { ...oldFieldsAcc, [attr]: value }
            }, {})
            return [...oldFavsAcc, fav]
        }, [])

        return favs;
    }

    static encodeDateFromToFilter({dateFrom, dateTo}) {
        const filters = []

        if(dateFrom)
            filters.push({ 
                class: "App\\Nova\\Filters\\FavoriteDateFromFilter", 
                value: dateFrom
            })

        if(dateTo)
            filters.push({ 
                class: "App\\Nova\\Filters\\FavoriteDateToFilter", 
                value: dateTo
            })
        
        return btoa(JSON.stringify(filters))
    }
}