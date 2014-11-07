
var Changeable = function(original, callback) {
  var changed = {}

  var copy = function(source, dest) {
    for(var key in source) {
      if(key == '_') {
        continue
      }

      if(typeof source[key] == 'string' || typeof source[key] == 'number' || typeof source[key] == 'boolean' || source[key] === undefined) {
        Object.defineProperty(dest, key, {
          enumerable: true,
          get: function(key) {
            return source[key]
          }.bind(this, key),
          set: function(key, value) {
            if(source[key] == value) {
              return
            }

            console.info('updating', key, 'was', source[key], 'now', value)
            source[key] = value

            changed[key] = value

            if(callback) callback(this.changed)
          }.bind(this, key)
        })
      } else if(Array.isArray(source[key])) {
        dest[key] = source[key]
      } else {
        dest[key] = new Changeable(source[key], function(change) {
          changed[key] = change
        })
      }
    }

    return dest
  }.bind(this)
  
  copy(original, this)

  Object.defineProperty(this, 'changed', {
    get: function() {
      return changed
    }
  })

  Object.defineProperty(this, 'hasChanged', {
    get: function() {
      return Object.keys(changed).length != 0
    }
  })
}

module.exports = Changeable
