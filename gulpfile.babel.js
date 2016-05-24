/**
 * tasks
 * - development                 -> [ gulp ]
 * - development watch           -> [ gulp watch ]
 * - development coding          -> [ gulp coding ]
 * - development coding watch    -> [ gulp coding-watch ]
 * - development scripting       -> [ gulp scripting ]
 * - development scripting watch -> [ gulp scripting-watch ]
 * - production                  -> [ gulp production ]
 * - image minimizing            -> [ gulp imagemin ]
 * - javascript test             -> [ gulp test ]
 * - create url list             -> [ gulp url-list ]
 * - unnecessary files delete    -> [ gulp clean ]
 *
 * options
 * - php server -> [ --php ]
 */


const gulp = require('gulp');
const gulpif = require('gulp-if');
const argv = require('minimist')(process.argv.slice(2));
const { forEach, map, merge, union, reduce } = require('lodash');
const { File, PluginError, log, replaceExtension } = require('gulp-util');
const { join, relative, dirname, basename } = require('path');
const fs = require('fs');
const recursive = require('recursive-readdir');
const through = require('through2');
const sort = require('gulp-sort');
const del = require('del');
const watch = require('gulp-watch');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync').create();
const browserSyncUrlList = require('browser-sync').create();
const runSequence = require('run-sequence');
const jade = require('jade');
const gulpJade = require('gulp-jade');
const data = require('gulp-data');
const htmlhint = require('gulp-htmlhint');
const stylus = require('gulp-stylus');
const nib = require('nib');
const url = require('gulp-css-url');
const bust = require('gulp-css-cache-bust');
const stylusSprites = require('gulp-stylus-sprites');
const webpack = require('webpack');
const eslint = require('gulp-eslint');
const bower = require('gulp-bower');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const sourcemaps = require('gulp-sourcemaps');
const crLfReplace = require('gulp-cr-lf-replace');
const iconv = require('gulp-iconv');
const extensonChange = require('gulp-extension-change');
const cache = require('gulp-cached');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const karma = require('karma');


/**
 * options
 */

// output url list to htdocs
const outputUrlListToHtdocs = false;


/**
 * production flag
 */
let isProduction = false;


/**
 * images change flag
 */
let isImagesChanged  = true;
let isSpritesChanged = true;


/**
 * viewing page
 */
let viewingPage = '';


/**
 * directory
 */
const DEST_ROOT = 'htdocs';

const JADE_BASE    = 'jade';
const JADE_SRC     = join(JADE_BASE, 'src');
const JADE_FACTORY = join(JADE_BASE, 'factorys');
const JADE_OTHER   = join(JADE_BASE, '!(src|factorys)');
const JADE_DEST    = DEST_ROOT;

const STYLUS_BASE  = 'stylus';
const STYLUS_SRC   = join(STYLUS_BASE, 'src');
const STYLUS_OTHER = join(STYLUS_BASE, '!(src)');
const STYLUS_DEST  = DEST_ROOT;

const IMAGES_BASE = 'images';

const SPRITE_SRC      = join(IMAGES_BASE, 'sprites');
const SPRITE_DEST     = DEST_ROOT;
const SPRITE_CSS_DEST = join(STYLUS_BASE, 'imports');

const IMAGEMIN_SRC  = join(IMAGES_BASE, 'src');
const IMAGEMIN_DEST = DEST_ROOT;

const WEBPACK_BASE  = 'webpack';
const WEBPACK_SRC   = join(WEBPACK_BASE, 'src');
const WEBPACK_OTHER = join(WEBPACK_BASE, '!(src)');
const WEBPACK_DEST  = DEST_ROOT;

const TEST_CONFIG_SRC = `${ __dirname }/karma.conf.js`;
const TEST_SRC        = 'test';


const URL_LIST = 'url-list';


/**
 * error
 */
const PLUMBER_OPTS = { errorHandler: notify.onError('<%= error.message %>') };


/**
 * default
 */
gulp.task('default', [ 'development' ]);


/**
 * development
 */
gulp.task('development', [ 'all' ]);


/**
 * production
 */
gulp.task('production', () => {
  isProduction = true;
  gulp.start('all');
});


/**
 * coding
 */
gulp.task('coding', () => {
  runSequence(
    'coding-watch',
    (() => isProduction ? [ 'sprite', 'imagemin' ] : 'sprite')(),
    [ 'jade', 'jade-factory', 'stylus' ],
    [ 'browser-sync', 'url-list' ]
  );
});


/**
 * scripting
 */
gulp.task('scripting', () => {
  runSequence(
    'scripting-watch',
    'webpack-first',
    'browser-sync'
  );
});


/**
 * all
 */
gulp.task('all', () => {
  runSequence(
    (() => isProduction ? 'production-watch' : 'all-watch')(),
    (() => isProduction ? [ 'sprite', 'imagemin' ] : 'sprite')(),
    [ 'jade', 'jade-factory', 'stylus', 'webpack-first' ],
    (() => isProduction ? [ 'browser-sync', 'clean' ] : 'browser-sync')()
  );
});


/**
 * watch
 */
gulp.task('watch', [ 'all-watch', 'browser-sync' ]);


/**
 * watch start
 */
const watchStart = (files, cb = null) => {
  watch(files, { ignoreInitial: false }, cb);
};


/**
 * coding watch
 */
gulp.task('coding-watch', () => {

  watchStart([ join(JADE_SRC    , '/**/*.jade') ], () => gulp.start('jade'));
  watchStart([ join(JADE_OTHER  , '/**/*.jade') ], () => gulp.start('jade-all'));
  watchStart([ join(JADE_FACTORY, '/**/*.json') ], () => gulp.start('jade-factory'));
  watchStart([ join(JADE_FACTORY, '/**/*.jade') ], () => gulp.start('jade-factory-all'));

  const styleTask = (stylusTask) => {
    runSequence.apply(this, [ 'sprite', stylusTask ]);
  };
  watchStart([ join(STYLUS_SRC   , '/**/*.styl') ], () => styleTask('stylus'));
  watchStart([ join(STYLUS_OTHER , '/**/*.styl') ], () => styleTask('stylus-all'));

  watchStart([ join(IMAGEMIN_SRC, '/**/*.+(png|jpg|gif|svg)') ], () => isImagesChanged  = true);
  watchStart([ join(SPRITE_SRC  , '/**/*.+(png|jpg|gif|svg)') ], () => isSpritesChanged = true);

  watchStart([ join(DEST_ROOT , '/**/*.+(html|php)') ], (file) => {
    const page = viewingPage ? join(__dirname, DEST_ROOT, viewingPage) : '*.+(html|php)';

    gulp.src(file.path)
      .pipe(gulpif(page, browserSync.reload({ stream: true })))
      .pipe(gulpif('*.html', htmlhint()));
  });

  watchStart([ join(DEST_ROOT , '/**/*.+(css|js|png|jpg|jpeg|gif|svg)') ], (file) => {
    gulp.src(file.path)
      .pipe(browserSync.reload({ stream: true }));
  });

});


/**
 * scripting watch
 */
gulp.task('scripting-watch', () => {
  watchStart([ join(WEBPACK_SRC  , '/**/*.js') ], () => gulp.start('webpack'));
  watchStart([ join(WEBPACK_OTHER, '/**/*.js') ], () => gulp.start('webpack-all'));
});


/**
 * all watch
 */
gulp.task('all-watch', [ 'coding-watch', 'scripting-watch' ]);


/**
 * production watch
 */
gulp.task('production-watch', () => {
  watchStart(join(DEST_ROOT, '/**/*.+(html|php|css|js|png|jpg|jpeg|gif|svg)'));
});


/**
 * browser-sync
 */
const browserSyncMiddleware = (req, res, next) => {
  const url = req.url.match(/^.*\/(.+\.(html|php))?$/);
  if(url) {
    if(url[0].match(/\/$/)) {
      viewingPage = `${ url[0] }index.html`;
    } else {
      viewingPage = url[0];
    }
  }
  next();
};

gulp.task('browser-sync', () => {
  if(!argv.php) {
    browserSync.init({
      server: {
        baseDir   : DEST_ROOT,
        middleware: browserSyncMiddleware,
      },
      open           : false,
      notify         : false,
      reloadOnRestart: true,
      // directory      : true,
    });
  }
  else {
    connect.server({
      port: 3002,
      base: DEST_ROOT,
      keepalive: false,
    });
    browserSync.init({
      proxy          : 'localhost:3002',
      middleware     : browserSyncMiddleware,
      open           : false,
      notify         : false,
      reloadOnRestart: true,
    });
  }
  browserSyncUrlList.init({
    server: {
      baseDir: URL_LIST,
      middleware: (req, res, next) => {
        gulp.start('url-list');
        next();
      },
    },
    port  : '3003',
    ui    : false,
    open  : false,
    notify: false,
    reloadOnRestart: true,
  });
});


/**
 * jade
 */
const jadeMember = (file, callback) => {
  const ret = {
    dirname : dirname(file.relative),
    filename: replaceExtension(basename(file.relative), '.html'),
    relative: (path) => {
      const pathName = relative(ret.dirname, path);
      return pathName ? `${ pathName }/` : './';
    },
    isProduction: isProduction,
  };
  callback(null, ret);
};

// jade.filters.sample = (block) => {
//   return block;
// };

gulp.task('jade', (done) => {
  jadeTask(join(JADE_SRC, '/**/*.jade'), JADE_DEST, true, done);
});

gulp.task('jade-all', (done) => {
  if(viewingPage) {
    const path = `${ viewingPage.match(/^(.+)(\.)(html|php)$/)[1] }.jade`;
    const dest = viewingPage.match(/^(.*\/)(.+\.)(html|php)$/)[1];
    jadeTask(join(JADE_SRC, path), join(JADE_DEST, dest), false);
    jadeTask([join(JADE_SRC, '/**/*.jade'), join(JADE_SRC, `!${ path }`)], JADE_DEST, false, done);
  } else {
    jadeTask(join(JADE_SRC, '/**/*.jade'), JADE_DEST, false, done);
  }
});

gulp.task('jade-factory', (done) => {
  jadeFactoryTask(true, done);
});

gulp.task('jade-factory-all', (done) => {
  jadeFactoryTask(false, done);
});

const jadeOpts = {
  jade   : jade,
  pretty : true,
  // pretty : !isProduction,
  basedir: join(__dirname, JADE_BASE),
};

const jadeTask = (srcPath, destPath, isSrcDirUpdate, done = null) => {
  return gulp.src(srcPath)
    .pipe(plumber(PLUMBER_OPTS))
    .pipe(gulpif(isSrcDirUpdate, cache('jade')))
    .pipe(data(jadeMember))
    .pipe(gulpJade(jadeOpts))
    // .pipe(crLfReplace({ changeCode: 'CR+LF' }))
    // .pipe(gulpif(isProduction, iconv({ encoding: 'shift_jis' })))
    .pipe(gulp.dest(destPath))
    .pipe(extensonChange({
      afterExtension: 'php',
      copy: true,
    }))
    .pipe(gulp.dest(JADE_DEST))
    .on('end', () => {
      if(done) done();
    });
};

const jadeFactoryTask = (isJsonFileUpdate, done) => {

  const factory = () => {
    const transform = function(data, encode, callback) {
      const tmps = JSON.parse(data.contents.toString());
      forEach(tmps, (pages, tmpPath) => {
        forEach(pages, (page, destPath) => {
          const vals = reduce(page, (memo, val, key) => {
            return `${ memo }  - var ${ key } = '${ val }'\n`;
          }, '');
          const tmpContent = fs.readFileSync(join(JADE_BASE, tmpPath)).toString().split('{{vars}}');
          const contents   = tmpContent[0] + vals + tmpContent[1];
          this.push(new File({
            path    : destPath,
            contents: new Buffer(contents),
          }));
        });
      });
      callback();
    };
    const flush = (callback) => {
      callback();
    };
    return through.obj(transform, flush);
  };

  gulp.src(join(JADE_FACTORY, '/**/*.json'))
    .pipe(plumber(PLUMBER_OPTS))
    .pipe(gulpif(isJsonFileUpdate, cache('jade-factory')))
    .pipe(factory())
    .pipe(data(jadeMember))
    .pipe(gulpJade(jadeOpts))
    .pipe(gulp.dest(JADE_DEST))
    .on('end', done);

};


/**
 * stylus
 */
gulp.task('stylus', (done) => {
  stylusTask(true, done);
});

gulp.task('stylus-all', (done) => {
  stylusTask(false, done);
});

const stylusTask = (isSrcDirUpdate, done) => {

  const stylusOpts = {
    use     : [ nib() ],
    compress: false,
    // compress: isProduction,
  };
  if(!isProduction) {
    merge(stylusOpts, {
      sourcemap: { inline: true },
    });
  }

  gulp.src(join(STYLUS_SRC, '/**/*.styl'))
    .pipe(plumber(PLUMBER_OPTS))
    .pipe(gulpif(isSrcDirUpdate, cache('stylus')))
    .pipe(stylus(stylusOpts))
    .pipe(gulpif(!isProduction, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(bust({ base: 'htdocs' }))
    .pipe(gulp.dest(STYLUS_DEST))
    .pipe(url({
      mode: 'relative',
      base: STYLUS_DEST,
    }))
    .pipe(gulp.dest(STYLUS_DEST))
    .on('end', done);

};


/**
 * css sprite images
 */
gulp.task('sprite', () => {

  if(!isSpritesChanged) return;

  isSpritesChanged = false;

  gulp.src(join(SPRITE_SRC, '/**/*.png'))
    .pipe(plumber(PLUMBER_OPTS))
    .pipe(sort())
    .pipe(changed(SPRITE_DEST))
    .pipe(stylusSprites({
      imgSrcBase     : SPRITE_SRC.replace('./', '/'),
      stylusFileName : 'sprite',
      spritesmithOpts: {
        engine: 'pngsmith',
        algorithmOpts: { sort: false },
      },
    }))
    .pipe(gulpif('*.png', gulp.dest(SPRITE_DEST)))
    .pipe(gulpif('*.styl', cache('stylus')))
    .pipe(gulpif('*.styl', gulp.dest(SPRITE_CSS_DEST)));

});


/**
 * imagemin
 */
gulp.task('imagemin', () => {

  if(!isImagesChanged) return;

  gulp.start([
    'imagemin-png',
    'imagemin-jpg',
    'imagemin-gif',
    'imagemin-svg',
  ]);
  isImagesChanged = false;

});

const imageminConfig = {
  png: {
    extension: 'png',
    opts: {
      optimizationLevel: 0,
      use: [
        pngquant({
          quality: 80,
          speed: 1,
        }),
      ],
    },
  },
  jpg: {
    extension: 'jpg',
    opts: { progressive: true },
  },
  gif: {
    extension: 'gif',
    opts: { interlaced: false },
  },
  svg: {
    extension: 'svg',
    opts: { multipass: false },
  },
};

forEach(imageminConfig, (val, key) => {
  gulp.task(`imagemin-${ key }`, (done) => {
    gulp.src(join(IMAGEMIN_SRC, `/**/*.${ val.extension }`))
      .pipe(plumber(PLUMBER_OPTS))
      .pipe(changed(IMAGEMIN_DEST))
      .pipe(imagemin(val.opts))
      .pipe(gulp.dest(IMAGEMIN_DEST))
      .on('end', done);
  });
});


/**
 * webpack (JavaScript)
 */
gulp.task('webpack-first', (done) => {
  bower()
    .once('end', () => {
      gulp.start('webpack');
      done();
    });
});

gulp.task('webpack', (done) => {
  webpackTask(true, done);
});

gulp.task('webpack-all', (done) => {
  webpackTask(false, done);
});

const webpackTask = (isSrcDir, done) => {

  const webpackOpts = () => {
    const opts = {
      resolve: {
        root      : [ join(__dirname, 'bower_components') ],
        extensions: [ '', '.js' ],
        alias: {
        //   'lodash'     : 'lodash/dist/lodash.min',
        //   'Velocity'   : 'velocity/velocity.min',
        //   'Velocity.ui': 'velocity/velocity.ui.min',
        },
      },
      module: {
        loaders: [
          {
            test   : /\.js$/,
            loader : 'babel',
            query  : { presets: [ 'es2015', 'stage-0' ] },
            exclude: /(node_modules|bower_components)/,
          },
        ],
      },
      plugins: [
        new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', [ 'main' ])
        )
      ],
    };
    if(!isProduction) {
      merge(opts, { devtool: 'source-map' });
    }
    // if(isProduction) {
    //   merge(opts.plugins, [
    //     new webpack.optimize.DedupePlugin(),
    //     new webpack.optimize.UglifyJsPlugin(),
    //     new webpack.optimize.OccurenceOrderPlugin(),
    //     new webpack.optimize.AggressiveMergingPlugin(),
    //   ]);
    // }
    return opts;
  };

  const build = (opts) => {
    const { basedir, src, dest, webpackOpts } = opts;
    const webpackBaseOpts = (entry, outputPath, outputFilename) => {
      return {
        entry: entry,
        output: {
          path: outputPath,
          filename: `${ outputFilename }.js`,
        },
      };
    };
    const transform = (data, encode, callback) => {
      const destDirname    = dirname(join(basedir, dest, relative(src, data.path)));
      const destFilename   = basename(data.path, '.js');
      const webpackAllOpts = merge(webpackBaseOpts(data.path, destDirname, destFilename), webpackOpts);
      webpack(webpackAllOpts, (err, stats) => {
        if(err) {
          throw new PluginError('webpack', err);
        }
        log('[webpack]', stats.toString());
        callback();
      });
    };
    const flush = (callback) => {
      callback();
    };
    return through.obj(transform, flush);
  };

  gulp.src(join(WEBPACK_SRC, '/**/*.js'))
    .pipe(plumber(PLUMBER_OPTS))
    .pipe(gulpif(isSrcDir, cache('webpack')))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(build({
      basedir    : __dirname,
      src        : WEBPACK_SRC,
      dest       : WEBPACK_DEST,
      webpackOpts: webpackOpts(),
    }))
    .on('end', done);

};


/**
 * javascript test
 */
gulp.task('test', () => {
  watch([ join(TEST_SRC , '/**/*') ], () => gulp.start('test'));
  karma.server.start({ configFile: TEST_CONFIG_SRC });
});


/**
 * url list
 */
gulp.task('url-list', (done) => {
  recursive(DEST_ROOT, ['!*.+(html|php)'], (err, files) => {
    const pathData = reduce(files, (memo, path, i) => {
      const pathName = path.replace('htdocs', '');
      if(i) {
        return `${ memo }, '${ pathName }'`;
      } else {
        return `'${ pathName }'`;
      }
    }, '');
    const tmpContent = fs.readFileSync(join(URL_LIST, 'tmp.html')).toString().split('{{data}}');
    const data = tmpContent[0] + pathData + tmpContent[1];
    fs.writeFile(join(URL_LIST, 'index.html'), data);
    if(outputUrlListToHtdocs && !isProduction) {
      fs.writeFile(join(DEST_ROOT, 'url-list.html'), data);
    }
    done();
  });
});


/**
 * clean
 */
gulp.task('clean', (done) => {
  del([ './**/.DS_Store', './**/Thumb.db', './htdocs/url-list.html', './htdocs/**/*.map' ])
  .then(() => {
    done();
  });
});
