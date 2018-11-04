## node-sdk for RealOptions

### Usage

```javascript
const realoptions=require('realoptions-node-sdk')
const ro=realoptions({api_key:'YOUR_API_KEY', version:'v1'})
ro.cgmy.constraints() //returns promise

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

ro.cgmy.density(cgmyParameters) //returns promise

```