module.exports = function(grunt){
    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    //grunt-contrib-watch 主要有文件发生变化就会执行里面注册的事件
    grunt.loadNpmTasks('grunt-contrib-watch')
    //grunt-nodemon' 入口文件修改时自动重启
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')

    // 防止因为语法错误或其他警告而中断grunt整个任务
    grunt.option('force', true)

    // 新建任务
    grunt.registerTask('default', ['concurrent'])
}