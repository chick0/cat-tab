const apiServerList = ["https://cat.kokoseij.xyz/list.json"]

/**
 * Cache TTL
 */
const TTL = 7 * 24 * 3600

/**
 * Get timestamp
 *
 * @returns {Number} Timestamp (sec)
 */
function getTimeStamp() {
    return Math.floor(Date.now() / 1000)
}

/**
 * Get last cache update time
 *
 * @returns {Number} Timestamp
 */
function getLastCacheTime() {
    const stamp = localStorage.getItem("onCacheUpdated")

    if (stamp == null) {
        return -1
    }

    const parsedStamp = Number.parseInt(stamp)

    if (Number.isNaN(parsedStamp)) {
        return -1
    }

    return parsedStamp
}

/**
 * Update cat image list from api server
 */
export function cacheUpdateHandler() {
    const stamp = getTimeStamp()
    const lastTime = getLastCacheTime()

    if (lastTime != -1) {
        const flow = stamp - lastTime

        if (flow < TTL) {
            console.log("[cat-tab] ttl OK, cache update skipped")
            return
        }
    }

    localStorage.clear()
    localStorage.setItem("onCacheUpdated", stamp.toString())

    let trackedFileList = []

    apiServerList.forEach((server) => {
        fetch(server)
            .then((resp) => resp.json())
            .then((json) => {
                json.forEach((item) => {
                    const url = item["url"]

                    if (url != null) {
                        if (url.startsWith("https://")) {
                            trackedFileList.push(url)
                        } else {
                            console.warn("NOT HTTPS")
                        }
                    }
                })

                localStorage.setItem("fileList", JSON.stringify(trackedFileList))
            })
    })

    console.log("[cat-tab] cache cleared")
    console.log("[cat-tab] file list updated")
}
