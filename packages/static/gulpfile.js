const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })
const gulp = require('gulp');
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();
const { createGulpEsbuild } = require("gulp-esbuild")
const sourcemaps = require('gulp-sourcemaps');

const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const ejs = require("gulp-ejs")
const htmlmin = require('gulp-htmlmin');

const buffer = require('vinyl-buffer');

const esbuild = createGulpEsbuild({
    pipe: true
})

const src = './src';
const dest = './build';

const reload = (done) => {
    browserSync.reload();
    done();
};

const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: `${dest}`
        },
        port: process.env.PORT,
        ui: false,
        open: false
    });
    done();
};

// Compile SASS to CSS with gulp
const css = (config) => {
    return () => {
        let stream = gulp.src(`${src}/sass/**/*.{sass,scss}`)

        const add = (pipeStream) => {
            stream = stream.pipe(pipeStream)
        }

        add(plumber())

        if (config.sourcemaps) {
            add(sourcemaps.init())
        }

        add(sass.sync({ outputStyle: "compressed" }))
        stream.on('error', sass.logError)
        add(rename({ basename: 'main', suffix: ".min" }))
        add(postcss([autoprefixer(), cssnano()]))

        if (config.sourcemaps) {
            add(sourcemaps.write(''))
        }

        add(gulp.dest(`${dest}/css`))
        add(browserSync.stream())

        return stream
    }
};

// Compile .ejs to minfied .html
const html = () => {
    // Find HTML
    return gulp.src(`${src}/*.ejs`)
        // Init Plumber
        .pipe(plumber())
        // Render templates
        .pipe(ejs())
        .pipe(rename({ extname: ".html" }))
        // Compile HTML to minified HTML
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            html5: true,
            removeEmptyAttributes: true,
            sortAttributes: true,
            sortClassName: true
        }))
        // Write everything to destination folder
        .pipe(gulp.dest(`${dest}`));
};

// Compile .js to minified .js
const script = (config) => {
    return () => {
        const envKeys = [
            "REACT_APP_DISCORD_BOT_CLIENT_ID"
        ]
    
        const env = Object.fromEntries(
            envKeys.map((key) => [
                "process.env." + key,
                JSON.stringify(process.env[key])
            ])
        )
    
        return gulp.src(`${src}/js/main.js`)
            .pipe(esbuild({
                bundle: true,
                minify: true,
                sourcemap: config.sourcemaps && "external",
                platform: "browser",
                define: env
            }))
            .pipe(buffer())
            .pipe(gulp.dest(`${dest}/js`));
    }
};

// Copy assets
const assets = () => {
    return gulp.src(`${src}/assets/**`)
        .pipe(gulp.dest(`${dest}/assets`));
};

function makeBuildTasks(config) {
    return [assets, css(config), script(config), html]
}

const devBuildTasks = makeBuildTasks({
    sourcemaps: true
})

const prodBuildTasks = makeBuildTasks({
    sourcemaps: false
})

// Watch changes and refresh page
const watch = () => gulp.watch(
    [`${src}/*.ejs`, `${src}/**/*.ejs`, `${src}/js/**/*.js`, `${src}/sass/**/*.{sass,scss}`, `${src}/assets/**/*.*`],
    gulp.series(...devBuildTasks, reload));

const dev = gulp.series(...devBuildTasks, serve, watch);

const build = gulp.series(...prodBuildTasks);

exports.default = dev;
exports.dev = dev;
exports.build = build;
