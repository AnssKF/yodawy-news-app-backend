
export const addFav = async ({ commit }, fav) => {
    const {url, publishedAt, user} = fav

    try{
        const res = await Nova.request().post('/nova-api/favs', {
            url, publishedAt, user
        })
        return Promise.resolve(res);
    }catch(e){
        return Promise.reject(e)
    }
}