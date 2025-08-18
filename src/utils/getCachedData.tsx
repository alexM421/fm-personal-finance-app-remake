export default async function getCachedData<T>(
        storageKey: string,
        asyncDataFetchingFunction: () => Promise<T>
    ) {

    const localStorageItem = localStorage.getItem(storageKey)
    const localStorageParsedItem =  localStorageItem
        ?JSON.parse(localStorageItem)
        :null

    const cachingTime = 60 * 60 * 1000 /* 1hour */ 
    const currentClientTime = Date.now()
    const storedDataClientTime = localStorageParsedItem?.["fetch-time"]
    const isCachedDurationOk = (currentClientTime - storedDataClientTime) <= cachingTime

    if(localStorageParsedItem && isCachedDurationOk){
        console.log("retrieved cached data")
        return localStorageParsedItem.cache
    }else{
        console.log("retrieved fetched data")
        const fetchedData = await asyncDataFetchingFunction()
        const cachedData = JSON.stringify({
            cache: fetchedData,
            "fetch-time": currentClientTime
        })
        localStorage.setItem(storageKey, cachedData)
        return fetchedData 
    }
}