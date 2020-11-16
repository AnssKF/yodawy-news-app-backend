
export class FavoritesHelper {
    
    static parseFavoritesResources(resources) {

        const favs = resources.reduce((oldFavsAcc, currentResource) => {

            const fav = currentResource.fields.reduce((oldFieldsAcc, currentField) => {
                return { ...oldFieldsAcc,  [currentField.attribute]: currentField.value }
            }, {})

            return [...oldFavsAcc, fav]
        }, [])
        
        return favs;
    }

}