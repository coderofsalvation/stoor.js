var Stoor = require('./../')

window.initStoreDefault = () => {
    var store = window.store = new Stoor({
        foo:{
            type:"string",
            default:"bar",
            placeholder:"enter foo"
        },
        bar:{
            type:"object",
            default:{a:1}
        }        
    })
    console.log("default store initialized")
}

