function Stoor(schema){

	// see https://gist.github.com/coderofsalvation/5605dbf346378ceaed4047fd342c1003
	this.middleware = function middleware(){
		this.middleware = [];
		this.use = (cb) => this.middleware.push(cb)
		this.process = (type,value,cb) => {
		  let i=0;  
		  var next = function(cb){
		  	return (this.middleware[i+=1] != null) ? this.middleware[i](type,value,next) : cb ? cb(type,value,i) : true
		  }.bind(this,cb)
		  return this.middleware[i](type,value,next)
		}
		this.use( (type,value,next) => next() ) // default, prevents crash?
		return this
	}

	// observable, see https://gist.github.com/developit/a0430c500f5559b715c2dddf9c40948d
	this.valoo = function valoo(v, cb) {
	  cb = cb || [];
	  var mw = new this.middleware()      
	  var obsrv = function (c) {
	  	var val = c != undefined ? c : v
	  	if (c && c.call) return cb.splice.bind(cb, cb.push(c) - 1, 1, null);								
		mw.process( c === void 0 ? "read" : "update",val, (e,c) => {
			if (c !== void 0) { // update	
				v = c;
				for (var i = 0, l = cb.length; i < l; i++) cb[i] && cb[i](v);	
			}			  
		})	
		return val 
	  }
	  obsrv.trigger = (e) => mw.process(e,v)
	  obsrv.use = (cb) => mw.use(cb)
	  return obsrv
	}

	this.checktype = (schema,e,v,next) => {
		if( e != "update" ) return next()
		var types = ['string','object','number']
		types.map( (t) => {
			if( schema.type == t && typeof v != t )
				throw 'stoor-value '+v+' is not of type '+t+' but instead: '+v
		})
		next()
	}

	// populate default values
	Object.keys(schema).map( (k) => { 
		this[k] = this.valoo( schema[k].placeholder || schema[k].default ) 
		this[k].schema = schema[k]
		this[k].use( this.checktype.bind(this,schema[k]) )
	})

	this.data = new Proxy(this,{
        get: function(obj,k){
        	if( !obj[k] ) return undefined
        	return obj[k]()
        },    
        set(obj,k,v){
        	if( !obj[k] ) return undefined        	
        	obj[k](v)
        	return true
        }
   	})
    this.mw = new this.middleware()
    this.use = (c) => this.mw.use(c)
    this.trigger = (c) => this.mw.process(c,(i) => i)

    return this
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Stoor;
} else window.Stoor = Stoor
