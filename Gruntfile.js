'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-atomizer');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.config.set('clean', {
        clean: ["components-dist/*.js", "public/stylesheets/*" , "build/*"]
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
