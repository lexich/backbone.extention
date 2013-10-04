module.exports = (grunt)->
  
  
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    clean:
      dist:
        files:[
          dot:true  
          src:[
            "dist"
            "build"            
          ]
        ]
    coffee:
      dist:
        files:[
          expand: true          
          cwd: "src"
          src:"backbone-extention.coffee"
          dest: "dist"
          ext: ".js"
        ]

    uglify:
      dist:
        options:
          compress:
            global_defs:
              "DEBUG": false        
            dead_code: true
          mangle: false          
          banner: """/*
            <%= pkg.name %> - v<%= pkg.version %> - 
            <%= grunt.template.today("yyyy-mm-dd") %> 
            author: <%= pkg.author %>
            */\n"""
        files:{
          "build/backbone-extention.min.js":"dist/backbone-extention.js"
        }

    copy:
      dist:
        src:"dist/backbone-extention.js"
        dest:"build/backbone-extention.js"

  grunt.registerTask "default", ["clean", "coffee", "uglify", "copy"]
  grunt.registerTask "update",->    
    pkg = grunt.file.readJSON('package.json')
    bow = grunt.file.readJSON('bower.json')
    version = pkg.version
    v = version.split(".")
    v[v.length-1] = "" + (parseInt(v[v.length-1]) + 1)
    pkg.version = v.join(".")
    bow.version = v.join(".")
    console.log "package.json"
    console.log pkg
    grunt.file.write "package.json", JSON.stringify(pkg)
    console.log "bower.json" 
    console.log bow
    grunt.file.write "bower.json", JSON.stringify(bow)


  grunt.loadNpmTasks "grunt-contrib"