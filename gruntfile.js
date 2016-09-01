module.exports = function (grunt) {
    var jsFiles = ['js/src/vendors/*.js', 'js/src/components/*.js', 'js/src/*.js'];
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                files: {
                    'css/style.css': 'scss/style.scss',
                },
                options: {
                    outputStyle: 'expanded'
                }
            },
            dist: {
                files: {
                    'css/style.css': 'scss/style.scss',
                },
                options: {
                    outputStyle: 'compressed'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            single_file: {
                src: 'css/style.css',
                dest: 'css/style.min.css' 
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass:dev', 'autoprefixer']
            },
            js: {
                files: jsFiles,
                tasks: ['uglify:dev']
            }
        },
        uglify: {
            dev: {
                option: {
                    compress: false
                },
                files: {
                    'js/dist/js.min.js': jsFiles
                } 
            },
            dist: {
                option: {
                    compress: true
                },
                files: {
                    'js/dist/js.min.js': jsFiles
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: '.'
                }
            }
        },
        imagemin: {
            jpg: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'img/src',
                    src: ['**/*.jpg'],
                    dest: 'img/dist'
                }]
            },
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'img/src',
                    src: ['**/*.png'],
                    dest: 'img/dist'
                }]
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', ['sass:dist', 'autoprefixer', 'uglify:dev', 'imagemin']);

};