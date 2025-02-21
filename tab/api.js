import { getFileName, getLocalHashList } from "./utils.js"

const apiServerList = [
    // "https://cat.kokoseij.xyz/list.json",
    "https://cats-img.ch1ck.xyz/db.json",
]

/**
 * Cache TTL
 */
const TTL = 7 * 24 * 3600

/**
 * API Code Version
 */
const VERSION = "v2"

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
export function fileListUpdateHandler() {
    const stamp = getTimeStamp()
    const lastTime = getLastCacheTime()

    if ((localStorage.getItem("apiVersion") ?? "") != VERSION) {
        console.log("[cat-tab] API code updated, ignore TTL")
    } else if (lastTime != -1) {
        const flow = stamp - lastTime

        if (flow < TTL) {
            console.log("[cat-tab] ttl OK, file list update skipped")
            return
        }
    }

    console.log("[cat-tab] file list cleared")
    localStorage.clear()
    localStorage.setItem("apiVersion", VERSION)
    localStorage.setItem("onCacheUpdated", stamp.toString())

    let hashList = getLocalHashList()
    let trackedFileList = []

    apiServerList.forEach(async (server) => {
        const origin = new URL(server).origin
        const resp = await fetch(server)
        const json = await resp.json()

        json.forEach((item) => {
            if (item != null) {
                if (item.startsWith("/")) {
                    const hash = getFileName(item)

                    if (!hashList.includes(hash)) {
                        hashList.push(hash)
                        trackedFileList.push(origin + item)
                    }
                } else {
                    console.warn("[API] DROP", item, "FROM", server)
                }
            }
        })

        localStorage.setItem("fileList", JSON.stringify(trackedFileList))
    })

    console.log("[cat-tab] file list updated")
}
