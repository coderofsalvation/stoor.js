> A tiny drop-in 🛸 jsonschema statemanager for javascript

## Usage

<center><img src="https://lh5.googleusercontent.com/TV99S8kriWNbNA6MYSiDZN1isQqlhQYiM6yYVzIr5_e2FM24jGjrnShyBARRXQjCi7vPJr1-0IRpjzwZQFb0=w1920-h1080-rw"/></center>

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