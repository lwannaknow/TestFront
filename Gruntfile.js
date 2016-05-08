module.exports = function(grunt) {
    // 构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> created by <%=pkg.author %> */\n'
            },
            //具体任务配置
            build: {
                //源文件
                src: './js/*.js',
                //目标文件
                dest: 'build/fist.min.js'
            }
        },
        clean:{
            options:{
                'no-write':false
            },
            build:['./build/*.js']
        }
    });
    // 加载指定插件任务
    //merge files
    grunt.loadNpmTasks('grunt-contrib-concat');
    //check js
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //remove files
    grunt.loadNpmTasks('grunt-contrib-clean');
    //uglify js files
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //copy files
    grunt.loadNpmTasks('grunt-contrib-copy');
    //compress zip
    grunt.loadNpmTasks('grunt-contrib-compress');
    // 默认执行的任务
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('clean_build', ['clean']);
};