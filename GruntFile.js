// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish'), // use jshint-stylish to make our errors look and read good
                'eqeqeq': true,
                'curly': true,
                'devel': true,
                'undef': true,
                //"unused" : true
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Grunfile.js', 'src/**/*.js']
        },

        jasmine: {
            src: ['src/**/*.js','_jasmine/dep/*.js'],
            options: {
                specs: 'specs/**/*.js'
            }
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                src: 'src/**/*.js',
                dest: 'dist/js/<%= pkg.name %>.min.js' 
                //files: {
                //    'dist/js/magic.min.js': 'src/js/magic.js'
                //}
            }
        },

        // compile less stylesheets to css -----------------------------------------
        /*
        less: {
            build: {
                files: {
                    'src/css/pretty.css': 'src/css/pretty.less'
                }
            }
        },
        */

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                src: 'src/**/*.css',
                dest: 'dist/css/<%= pkg.name %>.min.css'
            }
        },

        // configure watch to auto update ----------------
        watch: {
            // for stylesheets, watch css and less files 
            // only run less and cssmin stylesheets:
            files: ['src/**/*.css', 'src/**/*.less'],
            tasks: ['less', 'cssmin'],
            scripts: {
                files: 'src/**/*.js', 
                tasks: ['jshint', 'uglify']
            }
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
};