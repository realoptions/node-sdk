const ftch = global.fetch || require('node-fetch')
const resJson = res => res.json()
const getVersion = version => version === '' ? version : version + '/'
const generic_calculation = ({
    body, version, optionType, includeIV = false,
    model, sensitivity, apiKey, url
}) => ftch(
    `${url}/${getVersion(version)}${model}/calculator/${optionType}/${sensitivity}?include_implied_volatility=${includeIV}&access_token=${apiKey}`,
    {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {}
    }).then(resJson)

const generic_density = ({
    body, version, model,
    apiKey, metric, url
}) => ftch(
    `${url}/${getVersion(version)}${model}/${metric}?access_token=${apiKey}`,
    {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {}
    }).then(resJson)

const generic_constraints = ({
    model, apiKey,
    version, url
}) => ftch(
    `${url}/${getVersion(version)}${model}/parameters/parameter_ranges?access_token=${apiKey}`,
    { headers: {} }).then(resJson)

const init = ({
    api_key, version,
    url = 'https://api2.finside.org/realoptions'
}) => {

    return {
        cgmy: {
            options: (body, optionType, sensitivity, includeIV) => generic_calculation({
                body, version, optionType, includeIV,
                sensitivity, apiKey: api_key, url, model: 'cgmy'
            }),
            density: (body) => generic_density({
                body, model: 'cgmy', version,
                apiKey: api_key, url, metric: 'density'
            }),
            riskmetric: (body) => generic_density({
                body, model: 'cgmy', version,
                apiKey: api_key, url, metric: 'riskmetric'
            }),
            constraints: () => generic_constraints({
                model: 'cgmy', version,
                apiKey: api_key, url
            })
        },
        heston: {
            options: (body, optionType, sensitivity, includeIV) => generic_calculation({
                body, version, optionType, url, includeIV,
                sensitivity, apiKey: api_key, model: 'heston'
            }),
            density: (body) => generic_density({
                body, model: 'heston', version,
                apiKey: api_key, metric: 'density', url
            }),
            riskmetric: (body) => generic_density({
                body, model: 'heston', version,
                apiKey: api_key, metric: 'riskmetric', url
            }),
            constraints: () => generic_constraints({
                model: 'heston', version,
                apiKey: api_key, url
            })
        },
        merton: {
            options: (body, optionType, sensitivity, includeIV) => generic_calculation({
                body, version, optionType, url, includeIV,
                sensitivity, apiKey: api_key, model: 'merton'
            }),
            density: (body) => generic_density({
                body, model: 'merton', version,
                apiKey: api_key, metric: 'density', url
            }),
            riskmetric: (body) => generic_density({
                body, model: 'merton', version,
                apiKey: api_key, metric: 'riskmetric', url
            }),
            constraints: () => generic_constraints({
                model: 'merton', version,
                apiKey: api_key, url
            })
        },
        market: {
            constraints: () => generic_constraints({
                model: 'market', version,
                apiKey: api_key, url
            })
        }
    }
}
module.exports = init