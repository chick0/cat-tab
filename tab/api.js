import cats from "./cats.js"

const REMOTE_STATUS = "https://cats-a2a.pages.dev/db/status.json"
const REMOTE_HASH_INDEX = "https://cats-a2a.pages.dev/db/hash_index.json"

const KEY_LAST_CHECKED = "CAT_TAB_REMOTE_LAST_CHECKED"
const KEY_REMOTE_VERSION = "CAT_TAB_REMOTE_VERSION"
const KEY_CLIENT_VERSION = "CAT_TAB_CLIENT_VERSION"
export const FILE_LIST = "CAT_TAB_FILTERED_FILE_LIST"

const OPT_CLIENT_VERSION = "v3"
const OPT_TTL = 7 * 24 * 3600
const OPT_TTL_M = OPT_TTL * 1000

function isEmptyOrNull(obj) {
    if (obj == null) {
        return true
    }

    if (obj.length == 0) {
        return true
    }

    return false
}

async function checkUpdateRequired() {
    const client_version = localStorage.getItem(KEY_CLIENT_VERSION)
    const last_checked = localStorage.getItem(KEY_LAST_CHECKED)
    const version = localStorage.getItem(KEY_REMOTE_VERSION)

    // localStorage null check
    if (isEmptyOrNull(client_version)) {
        console.log("* [CAT_TAB_CLIENT_VERSION] is null or missing!")
        return true
    }
    if (isEmptyOrNull(last_checked)) {
        console.log("* [KEY_LAST_CHECKED] is null or missing!")
        return true
    }
    if (isEmptyOrNull(version)) {
        console.log("* [KEY_REMOTE_VERSION] is null or missing!")
        return true
    }

    // check client version
    if (client_version != OPT_CLIENT_VERSION) {
        console.log("* [OPT_CLIENT_VERSION] is outdated!")
        return true
    }

    // check ttl
    const lc_date = new Date(last_checked)

    if (Date.now() - lc_date >= OPT_TTL_M) {
        console.log("* [KEY_LAST_CHECKED] is outdated!")
        return true
    }

    // check remote version
    const remote = await getRemoteVersion()

    if (version != remote) {
        console.log("* [KEY_REMOTE_VERSION] is outdated!")
        return true
    }

    // up-to-date!
    return false
}

async function getRemoteVersion() {
    const cache = sessionStorage.getItem(KEY_REMOTE_VERSION)

    if (isEmptyOrNull(cache)) {
        const resp = await fetch(REMOTE_STATUS)
        console.log("GET", REMOTE_STATUS)

        const json = await resp.json()
        sessionStorage.setItem(KEY_REMOTE_VERSION, json["version"])
        return json["version"]
    }

    console.log("HIT", REMOTE_STATUS)
    return cache
}

async function getHashIndex() {
    const cache = sessionStorage.getItem(REMOTE_HASH_INDEX)

    if (isEmptyOrNull(cache)) {
        const resp = await fetch(REMOTE_HASH_INDEX)
        console.log("GET", REMOTE_HASH_INDEX)

        const json = await resp.json()
        sessionStorage.setItem(REMOTE_HASH_INDEX, JSON.stringify(json))
        return json
    }

    console.log("HIT", REMOTE_HASH_INDEX)
    return JSON.parse(cache)
}

export async function updateRemoteData() {
    const isUpdateRequired = await checkUpdateRequired()

    if (!isUpdateRequired) {
        console.log("* Update passed!")
        return
    }

    // do update
    const hashIndex = await getHashIndex()
    const origin = new URL(REMOTE_HASH_INDEX).origin
    let add = []

    Object.keys(hashIndex).forEach((hash) => {
        let isDuplicated = false

        for (let i = 0; i < cats.length; i++) {
            isDuplicated = cats[i].includes(hash)

            if (isDuplicated) {
                break
            }
        }

        if (!isDuplicated) {
            add.push(origin + hashIndex[hash])
        }
    })

    // update storage
    const latestVersion = await getRemoteVersion()

    localStorage.clear()
    localStorage.setItem(KEY_LAST_CHECKED, new Date().toISOString())
    localStorage.setItem(KEY_REMOTE_VERSION, latestVersion)
    localStorage.setItem(KEY_CLIENT_VERSION, OPT_CLIENT_VERSION)
    localStorage.setItem(FILE_LIST, JSON.stringify(add))
}
