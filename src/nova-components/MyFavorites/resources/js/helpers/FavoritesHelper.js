
export class FavoritesHelper {
    
    static parseFavoritesResources(resources) {
        const favs = resources.reduce((oldFavsAcc, currentResource) => {
            const fav = currentResource.fields.reduce((oldFieldsAcc, currentField) => {
                const attr = currentField.attribute === 'ComputedField'? currentField.name.toLowerCase(): currentField.attribute
                return { ...oldFieldsAcc,  [attr]: currentField.value }
            }, {})
            return [...oldFavsAcc, fav]
        }, [])
        return favs;
    }
}