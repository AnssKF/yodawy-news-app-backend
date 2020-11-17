
export class FavoritesHelper {
    
    static parseFavoritesResources(resources) {
        const favs = resources.reduce((oldFavsAcc, currentResource) => {
            const fav = currentResource.fields.reduce((oldFieldsAcc, currentField) => {
                let attr = currentField.attribute === 'ComputedField'? currentField.name.toLowerCase(): currentField.attribute;
                
                if(attr.indexOf('.') !== -1){
                    const split = attr.split('.')
                    attr = split[split.length -1]
                }

                return { ...oldFieldsAcc,  [attr]: currentField.value }
            }, {})
            return [...oldFavsAcc, fav]
        }, [])
        
        return favs;
    }
}