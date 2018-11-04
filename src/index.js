const ftch=global.fetch||require('node-fetch')

const generic_calculation=({
    body, version, optionType, 
    model, sensitivity, headers, url
})=>ftch(
    `${url}/${version}/${model}/calculator/${optionType}/${sensitivity}`,
    {
        method:'POST',
        body:JSON.stringify(body),
        headers
    }).then(res=>res.json())

const generic_density=({
    body, version, model, 
    headers, metric, url
})=>ftch(
    `${url}/${version}/${model}/${metric}`,
    {
        method:'POST',
        body:JSON.stringify(body),
        headers
    }).then(res=>res.json())

const generic_constraints=({
    model, headers, 
    version, url
})=>ftch(
    `${url}/${version}/${model}/parameters/parameter_ranges`,
    {headers}).then(res=>res.json())

const init=({
    api_key, version, 
    url='https://api.finside.org/realoptions'
})=>{
    const headers={
        'x-api-Key':api_key
    }
    return {
        cgmy:{
            options:(body, optionType, sensitivity)=>generic_calculation({
                body, version, optionType, 
                sensitivity, headers, url, model:'cgmy'
            }),
            density:(body)=>generic_density({
                body, model:'cgmy', version, 
                headers, url, metric:'density'
            }),
            riskmetric:(body)=>generic_density({
                body, model:'cgmy', version, 
                headers, url, metric:'riskmetric'
            }),
            constraints:()=>generic_constraints({
                model:'cgmy', version, 
                headers, url
            })
        },
        heston:{
            options:(body, optionType, sensitivity)=>generic_calculation({
                body, version, optionType, url,
                sensitivity, headers, model:'heston'
            }),
            density:(body)=>generic_density({
                body, model:'heston', version, 
                headers, metric:'density', url
            }),
            riskmetric:(body)=>generic_density({
                body, model:'heston', version, 
                headers, metric:'riskmetric', url
            }),
            constraints:()=>generic_constraints({
                model:'heston', version, 
                headers, url
            })
        },
        merton:{
            options:(body, optionType, sensitivity)=>generic_calculation({
                body, version, optionType, url,
                sensitivity, headers, model:'merton'
            }),
            density:(body)=>generic_density({
                body, model:'merton', version, 
                headers, metric:'density', url
            }),
            riskmetric:(body)=>generic_density({
                body, model:'merton', version, 
                headers, metric:'riskmetric', url
            }),
            constraints:()=>generic_constraints({
                model:'merton', version, 
                headers, url
            })
        }
    }
}
module.exports=init