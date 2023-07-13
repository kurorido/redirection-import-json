const fs = require('fs')
const { URL } = require('url');

const items = JSON.parse(fs.readFileSync('sample.json'))

const redirects = []

for (const item of items) {

    const source = item.source
    const destination = item.destination

    const urlObject = new URL(source);
    const domain = urlObject.hostname;
    const path = urlObject.pathname;

    redirects.push({
        "url": path,
        "match_url": path,
        "match_data": {
            "source": {
                "flag_query": "pass",
                "flag_case": false,
                "flag_trailing": false,
                "flag_regex": false
            }
        },
        "action_code": 301,
        "action_type": "url",
        "action_data": {
            "server": domain,
            "url_from": destination,
            "url_notfrom": ""
        },
        "match_type": "server",
        "title": "",
        "hits": 0,
        "regex": false,
        "group_id": 1,
        "position": 0,
        "last_access": "-",
        "enabled": true
    })
}

fs.writeFileSync('redirects.json', JSON.stringify({ redirects }, null, 2))
