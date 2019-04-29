/// <binding AfterBuild='all' ProjectOpened='watch' />
'use strict';

module.exports = function (grunt) {
    grunt.initConfig({

        // Verzeichnisse im Order wwwroot aufräumen
        // Verzeichnis 'AppAssets/temp aufräumen
        clean: ['wwwroot/css/*', 'wwwroot/img/*', 'wwwroot/js/*', 'wwwroot/lib/*', 'AppAssets/temp/*'],

        // alle LESS-Dateien in CSS-Dateien kompilieren
        // alle CSS-Dateien mit vendor spezifischen Properties versehen
        // alle CSS-Dateien zusammenfassen, minimieren und in den Ordner 'wwwroot/css' kopieren
        less: {
            convert: {
                files: {
                    'AppAssets/css/siteBody.css': 'AppAssets/css/siteBody.less',
                    'AppAssets/css/variables.css': 'AppAssets/css/variables.less'
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({ browsers: 'last 2 versions' })
                ]
            },
            dist: { src: 'AppAssets/css/*.css' }
        },
        cssmin: {
            target: {
                files: {
                    'wwwroot/css/style.min.css': ['AppAssets/css/site.css', 'AppAssets/css/siteBody.css']
                }
            }
        },

        // JavaScript-Dateien aus dem Verzeichnis „AppAssets/js“ zusammenfassen, minimieren
        // und in den Ordner 'wwwroot/js' kopieren
        concat: {
            jsFiles: {
                src: ['AppAssets/js/*.js'],
                dest: 'AppAssets/temp/site.js'
            }
        },
        uglify: {
            all: {
                src: ['AppAssets/temp/site.js'],
                dest: 'wwwroot/js/site.min.js'
            }
        },

        // die Dateien jquery.min.js und bootstrap.min.css aus dem Verzeichnis 
        // AppAssets/lib in das Verzeichnis wwwroot/lib kopieren
        // Grafiken aus dem Verzeichnis AppAssets/img in das Verzeichnis wwwroot/img kopieren
        copy: {
            lib: {
                cwd: 'AppAssets/lib',
                src: '**/*',
                dest: 'wwwroot/lib',
                expand: true
            },
            img: {
                cwd: 'AppAssets/img',
                src: '**/*',
                dest: 'wwwroot/img',
                expand: true
            }
        },

        // JavaScript-Dateien im Verzeichnis "AppAssets/js" und die Datei gruntfile.js beobachten
        // bei Änderungen den Task jshint aufrufen
        watch: {
            files: ['gruntfile.js', 'AppAssets/js/*.js'],
            tasks: ['jshint']
        },
        jshint: {
            // eine Beschreibung der Optionen gibt es hier: https://jshint.com/docs/options/
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                devel: true,
                strict: 'global',
                quotmark: 'single'
            },
            uses_defaults: ['gruntfile.js', 'AppAssets/js/*.js']
        }
    });

    // alle Tasks zu einem Task zusammenfassen
    grunt.registerTask('all', ['clean', 'less', 'postcss', 'cssmin', 'concat', 'uglify', 'copy']);


    // die benötigten npm-packages importieren
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
