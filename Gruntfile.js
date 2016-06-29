'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-atomizer');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.config.set('clean', {
        clean: ["components-dist/*.js", "public/stylesheets/*" , "build/*"]
    });

    grunt.config.set('mochaTest', {

        test: {
            options: {
                reporter: 'spec',
                clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['test/**/*.js']
        }
    });

    grunt.config.set('babel', {
        all: {
            options: {
                sourceMap: false,
                presets: ['react', 'es2015']
            },
            files: [
                {
                    expand: true,
                    cwd: 'components/',
                    src: [
                       '**/*.js'
                    ],
                    dest: 'components-dist/',
                    extDot: 'last',
                    ext: '.js'
                }
            ]
        }
    });

    grunt.config.set('atomizer', {
        options: {
            namespace: '#atomic'
        },
        files: {
            src: ['./components/**/*.js'],
            dest: './public/stylesheets/atomic.css'
        }
    });

};
