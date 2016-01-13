module.exports = (grunt) ->
  # load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  # load package config
  pkg = grunt.file.readJSON('package.json')

  grunt.initConfig

    # jsdoc2md
    jsdoc2md:
      api:
        src: 'lib/*.js'
        dest: 'Documentation.md'

    # nodemon
    nodemon:
      options:
        args: ['development']
        nodeArgs: ['--debug']
        watch: [
          'lib',
          'test'
        ]
        legacyWatch: true

      # nodemon.test
      api:
        script: 'test/index.js'
        options:
          callback: (nodemon) ->
            nodemon.on 'log', (evt) ->
              console.log evt.colour

            nodemon.on 'restart', () ->
              console.log 'restart test.'



  # register task
  grunt.registerTask 'default', () ->
    grunt.task.run [
      'nodemon'
    ]
