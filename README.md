> A tiny drop-in 🛸 jsonschema statemanager for javascript

<img src="https://api.travis-ci.org/coderofsalvation/stoor.js.svg?branch=master"/>

## Usage

<center><img src="https://raw.githubusercontent.com/coderofsalvation/stoor.js/master/screenshot.png"/></center>

Output:

    updated: ABC
    ABC
    ABC
    {type:'string', default:'foo'}

This library is handy to act as the 'heart' of a javascript mobile or desktop application which was written programmatically (dom-style).
Sometimes rewriting something in React/Vuejs is too expensive compared to introducing a functional store into the application.

> NOTE: you can put stores into stores recursively 😎 like so:

    store.bar( new Stoor({
        apples:{ type:"number", default:1},        
    }))
    store.bar().apples(5) // increment apples

## Features

* tiny portable library (code fits on one screen)
* jsonschema initialisation (to generate forms later on)
* typesafe checks (extendable with [tv4](https://npmjs.org/package/tv4) using middleware for jsonschema v4-support)
* sync + async access: `store.data.foo` returns `store.foo()` while bypassing middleware+listeners

## Browser example

    <script src="https://unpkg.com/stoor.js"></script>
    <script>
        var store = new Stoor({...})
    </script>

## Listeners

    var off = store.foo( (v) => {
        // react on change        
    })
    off() // delete listener

## Middleware

Property-specific:

    store.foo.use( (e,v,next) => {
        if( e == 'update' ){ ... }          // triggered when value is updated
        if( e == 'read'   ){ ... }          // triggered when value is being read ( `store.foo()` )
        if( e == 'bless'  ){ ... }          // custom
        next(v)                             // continue (async) middleware
    })
    store.foo.trigger('bless', new Date())  // trigger custom event

Store-specific:

    store.use( (e,v,next) => {
        if( e == 'bless'  ){ ... }          // custom
        next(v)                             // continue (async) middleware
    })
    store.trigger('bless', new Date())

## Reason

* selfstudy in portable & dependency-free javascript
* needed something jsonschema-, framework-agnostic-, async+sync ish for an existing codebase
* sometimes converting a codebase to react/vuejs is too expensive
