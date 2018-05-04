var gulp = require("gulp");
var server= require("gulp-webserver");
var scss = require("gulp-sass");
var concat = require("gulp-concat");
var sequence = require("gulp-sequence");
var autoprefixer = require("gulp-autoprefixer");
var minCss = require("gulp-clean-css");
var data = require("./src/data/home.json");
var search = require("./src/data/search.json");
var url = require("url");
var querystring = require("querystring");

gulp.task("mincss", function() {
    return gulp.src(["src/scss/*.scss"])
        .pipe(scss())
        .pipe(autoprefixer({
        	browsers: ['last 2 versions', 'Android >= 4']
        }))
        .pipe(minCss())
        .pipe(gulp.dest("src/css"))
})


gulp.task("server", function() {
    return gulp.src("src")
        .pipe(server({
            port: '9090',
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
              
                if (req.url === '/ban') {
                    res.end(JSON.stringify(data))
                }else if(/\/api\/search/g.test(req.url)){
                	var key = querystring.unescape(url.parse(req.url,true).query.key);
                	var list = search.items;
                	var arr = [];
                	for (var i=0;i<list.length;i++){
                		if(list[i].title.match(key)){
                			arr.push(list[i])
                		}
                	}
                	res.end(JSON.stringify(arr))
                }else if (/\/api\/detail/g.test(req.url)) {
                    var fiction_id = url.parse(req.url, true).query.fiction_id;
                    var detail = require("./src/data/" + fiction_id + ".json");
                    console.log(detail)
                    res.end(JSON.stringify(detail))
                }
                next()
            }
        }))
})

gulp.task("watch", function() {
    return gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"] , ['mincss'])
})

gulp.task("default", function(cd) {
   sequence('mincss' , 'server' , 'watch', cd)
})
