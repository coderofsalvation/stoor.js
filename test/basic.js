var test = require('zora')

test('init store',t=>{
    window.initStoreDefault() 
    t.equal( window.store.foo(), "enter foo" )    
})

test('update var incorrect type (string)',t=>{
    window.initStoreDefault()
    if( window.store.foo() != "enter foo" ) t.fail('store not initialized')
    try{ window.store.foo(123) }
    catch(e){}
    t.equal(window.store.foo(),"enter foo")
    t.equal(window.store.data.foo,"enter foo")
})

test('update var incorrect type (object)',t=>{
    window.initStoreDefault()
    if( window.store.foo() != "enter foo" ) t.fail('store not initialized')
    try{ window.store.foo({fo:12}) }
    catch(e){}
    t.equal(window.store.foo(),"enter foo")
    t.equal(window.store.data.foo,"enter foo")
})

test('update var correct type (object)',t=>{
    window.initStoreDefault()
    try{ window.store.bar({fo:12}) }
    catch(e){}
    t.equal(window.store.bar().fo,12)
    t.equal(window.store.data.bar.fo,12)
})

test('update var correct type (string)',t=>{
    window.initStoreDefault()
    if( window.store.foo() != "enter foo" ) t.fail('store not initialized')
    try{ window.store.foo("abc") }
    catch(e){}
    t.equal(window.store.foo(),"abc")
    t.equal(window.store.data.foo,"abc")    
})

test('middleware',t=>{
    window.initStoreDefault()
    var called = {mw:false}

    window.store.foo.use( (e,v,next) => {
        called.mw = true
        next(v)
    })
    t.equal( window.store.foo(), "enter foo" )    
    t.equal( window.store.foo("123"), "123" )
    t.equal( window.store.foo(), "123" )
    t.equal(called.mw,true,"middleware not called")
    t.equal(window.store.foo.schema.type,typeof window.store.foo(), "type is not string")
})

test('middleware trigger',t=>{
    window.initStoreDefault()
    var called = {mw:false}

    window.store.foo.use( (e,v,next) => {
        if( e == 'dosomething' ) called.mw = true
        next(v)
    })
    window.store.foo.trigger('dosomething',new Date())
    t.equal(called.mw,true,"middleware trigger called")
})


test('store middleware trigger',t=>{
    window.initStoreDefault()
    var called = {mw:false}

    window.store.use( (e,v,next) => {
        if( e == 'dosomething' ) called.mw = true
        next(v)
    })
    window.store.trigger('dosomething',new Date())
    t.equal(called.mw,true,"middleware trigger called")
})


test('listeners',t=>{
    window.initStoreDefault()
    var called = false
    window.store.foo( (v) => called = v ) 
    window.store.foo("ggg")
    t.equal(window.store.data.foo,"ggg")
    t.equal(called,"ggg")    
})

