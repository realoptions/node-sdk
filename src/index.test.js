const realoptions=require('./index')
const mockurl='http://localhost:8000'
const ro=realoptions({api_key:'hello', version:'v1', url:mockurl})
const hestonParameters={
    num_u:8,
    rate:0.04,
    maturity:1,
    asset:50,
    cf_parameters:{
        sigma:0.3, 
        speed:0.4,
        v0:0.3,
        eta_v:0.2,
        rho:-.5
    },
    strikes:[50],
    quantile:0.01
}
const mertonParameters={
    num_u:8,
    rate:0.04,
    maturity:1,
    asset:50,
    cf_parameters:{
        sigma:0.3, 
        speed:0.4,
        v0:0.9,
        eta_v:0.2,
        rho:-.5,
        sig_l:0.2,
        mu_l:0.3,
        lambda:0.2
    },
    strikes:[50],
    quantile:0.01
}
const cgmyParameters={
    num_u:8,
    rate:0.04,
    maturity:1,
    asset:50,
    cf_parameters:{
        sigma:0.3, 
        speed:0.4,
        v0:0.9,
        eta_v:0.2,
        rho:-.5,
        c:1,
        g:5,
        m:5,
        y:0.5
    },
    strikes:[50],
    quantile:0.01
}

it('correctly calls cgmy constraints', ()=>{
    return ro.cgmy.constraints().then(constraints=>{
        return expect(constraints).toBeDefined()
    })
})
it('correctly calls cgmy density', ()=>{
    return ro.cgmy.density(cgmyParameters).then(results=>{
        return expect(Array.isArray(results)).toEqual(true)
    })
})
it('correctly calls cgmy riskmetrics', ()=>{
    let results
    return ro.cgmy.riskmetric(cgmyParameters).then(results_=>{
        results=results_
        return expect(results.value_at_risk).toBeDefined()
    }).then(()=>{
        return expect(results.expected_shortfall).toBeDefined()
    })
})
it('correctly calls cgmy options', ()=>{
    return ro.cgmy.options(mertonParameters, 'call', 'price').then(results=>{
        return expect(Array.isArray(results)).toEqual(true)
    })
})
it('correctly calls merton constraints', ()=>{
    return ro.merton.constraints().then(constraints=>{
        return expect(constraints).toBeDefined()
    })
})
it('correctly calls merton density', ()=>{
    return ro.merton.density(mertonParameters).then(results=>{
        return expect(Array.isArray(results)).toEqual(true)
    })
})
it('correctly calls merton riskmetrics', ()=>{
    let results
    return ro.merton.riskmetric(mertonParameters).then(results_=>{
        results=results_
        return expect(results.value_at_risk).toBeDefined()
    }).then(()=>{
        return expect(results.expected_shortfall).toBeDefined()
    })
})
it('correctly calls merton options', ()=>{
    return ro.merton.options(mertonParameters, 'call', 'price').then(results=>{
        return expect(Array.isArray(results)).toEqual(true)
    })
})
it('correctly calls heston constraints', ()=>{
    return ro.heston.constraints().then(constraints=>{
        return expect(constraints).toBeDefined()
    })
})
it('correctly calls heston density', ()=>{
    return ro.heston.density(hestonParameters).then(results=>{
        return expect(Array.isArray(results)).toEqual(true)
    })
})
it('correctly calls heston riskmetrics', ()=>{
    let results
    return ro.heston.riskmetric(hestonParameters).then(results_=>{
        results=results_
        return expect(results.value_at_risk).toBeDefined()
    }).then(()=>{
        return expect(results.expected_shortfall).toBeDefined()
    })
})
it('correctly calls merton options', ()=>{
    return ro.heston.options(hestonParameters, 'call', 'price').then(results=>{
        return expect(Array.isArray(results)).toEqual(true)
    })
})
it('correctly calls market constraints', ()=>{
    return ro.market.constraints().then(results=>{
        return expect(results).toBeDefined()
    })
})