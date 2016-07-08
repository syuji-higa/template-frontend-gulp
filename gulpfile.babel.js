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


import gulp from 'gulp';
import gulpif from 'gulp-if';
import minimist from 'minimist';
import { forEach, map, merge, union, reduce, every } from 'lodash';
import { File, PluginError, log, replaceExtension } from 'gulp-util';
import { join, relative, dirname, basename } from 'path';
import fs from 'fs';
import recursive from 'recursive-readdir';
import through from 'through2';
import sort from 'gulp-sort';
import filter from 'gulp-filter';
import del from 'del';
import watch from 'gulp-watch';
import connect from 'gulp-connect-php';
import bs from 'browser-sync';
import bsUrlList from 'browser-sync';
import runSequence from 'run-sequence';
import pug from 'pug';
import gulpPug from 'gulp-pug';
import data from 'gulp-data';
import htmlhint from 'gulp-htmlhint';
import stylus from 'gulp-stylus';
import nib from 'nib';
import url from 'gulp-css-url';
import bust from 'gulp-css-cache-bust';
import stylusSprites from 'gulp-stylus-sprites';
import webpack from 'webpack';
import eslint from 'gulp-eslint';
import bower from 'gulp-bower';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import sourcemaps from 'gulp-sourcemaps';
import crLfReplace from 'gulp-cr-lf-replace';
import iconv from 'gulp-iconv';
import extensonChange from 'gulp-extension-change';
import cache from 'gulp-cached';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import karma from 'karma';

const argv = minimist(process.argv.slice(2));
const browserSync = bs.create();
const browserSyncUrlList = bsUrlList.create();


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

const PUG_BASE    = 'pug';
const PUG_SRC     = join(PUG_BASE, 'src');
const PUG_FACTORY = join(PUG_BASE, 'factorys');
const PUG_OTHER   = join(PUG_BASE, '!(src|factorys)');
const PUG_DEST    = DEST_ROOT;

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
gulp.task('default', (done) => {
  runSequence('development', done);
});


/**
 * development
 */
gulp.task('development', (done) => {
  runSequence('all', done);
});


/**
 * production
 */
gulp.task('production', (done) => {
  isProduction = true;
  runSequence('all', done);
});


/**
 * coding
 */
gulp.task('coding', (done) => {
  const sequence = (() => {
    if(isProduction) {
      return [
        'sprite',
        'imagemin',
        [ 'pug', 'pug-factory', 'stylus' ],
        'url-list',
        'browser-sync',
        'coding-watch',
      ]
    } else {
      return [
        'sprite',
        [ 'pug', 'pug-factory', 'stylus' ],
        'url-list',
        'browser-sync',
        'coding-watch',
      ]
    }
  })();

runSequence(...union(sequence, [done]));
});


/**
 * scripting
 */
gulp.task('scripting', (done) => {
  runSequence(
    'webpack-first',
    'browser-sync',
    'scripting-watch',
    done
  );
});


/**
 * all
 */
gulp.task('all', (done) => {
  const sequence = (() => {
    if(isProduction) {
      return [
        'sprite',
        'imagemin',
        [ 'pug', 'pug-factory', 'stylus', 'webpack-first' ],
        'clean',
        'browser-sync',
        'production-watch',
      ]
    } else {
      return [
        'sprite',
        [ 'pug', 'pug-factory', 'stylus', 'webpack-first' ],
        'browser-sync',
        'all-watch',
      ]
    }
  })();

  runSequence(...union(sequence, [done]));
});


/**
 * watch
 */
gulp.task('watch', (done) => {
  runSequence([ 'all-watch', 'browser-sync' ], done);
});


/**
 * watch start
 */
const watchStart = (files, cb = null) => {
  watch(files, { ignoreInitial: true }, cb);
};


/**
 * coding watch
 */
gulp.task('coding-watch', (done) => {
  return (() => {

    watchStart([ join(PUG_SRC    , '/**/*.pug') ], () => gulp.start('pug'));
    watchStart([ join(PUG_OTHER  , '/**/*.pug') ], () => gulp.start('pug-all'));
    watchStart([ join(PUG_FACTORY, '/**/*.json') ], () => gulp.start('pug-factory'));
    watchStart([ join(PUG_FACTORY, '/**/*.pug') ], () => gulp.start('pug-factory-all'));

    watchStart([ join(STYLUS_SRC   , '/**/*.styl') ], () => runSequence([ 'sprite', 'stylus' ]));
    watchStart([ join(STYLUS_OTHER , '/**/*.styl') ], () => runSequence([ 'sprite', 'stylus-all' ]));

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

    done();

  })();
});


/**
 * scripting watch
 */
gulp.task('scripting-watch', (done) => {
  return (() => {
    watchStart([ join(WEBPACK_SRC  , '/**/*.js') ], () => gulp.start('webpack'));
    watchStart([ join(WEBPACK_OTHER, '/**/*.js') ], () => gulp.start('webpack-all'));
    done();
  })();
});


/**
 * all watch
 */
gulp.task('all-watch', (done) => {
  return runSequence([ 'coding-watch', 'scripting-watch' ], done);
});


/**
 * production watch
 */
gulp.task('production-watch', (done) => {
  return (() => {
    watchStart(join(DEST_ROOT, '/**/*.+(html|php|css|js|png|jpg|jpeg|gif|svg)'));
    done();
  })();
});


/**
 * browser-sync
 */
const browserSyncMiddleware = (req, res, next) => {
  const exclusionFiles = [];
  const url = req.url.match(/^.*\/(.+\.(html|php))?$/);

  if(url && every(exclusionFiles, (file) => (file !== url[0]))) {
    if(url[0].match(/\/$/)) {
      viewingPage = `${ url[0] }index.html`;
    } else {
      viewingPage = url[0];
    }
  }
  next();
};

gulp.task('browser-sync', (done) => {
  if(!argv.php) {
    browserSync.init({
      server: {
        baseDir   : DEST_ROOT,
        middleware: browserSyncMiddleware,
      },
      open  : false,
      notify: false,
      reloadOnRestart: true,
      // directory: true,
    });
  }
  else {
    connect.server({
      port: 3002,
      base: DEST_ROOT,
      keepalive: false,
    });
    browserSync.init({
      proxy     : 'localhost:3002',
      middleware: browserSyncMiddleware,
      open      : false,
      notify    : false,
      reloadOnRestart: true,
    });
  }
  return browserSyncUrlList.init({
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
  }, done);
});


/**
 * pug
 */
const pugMember = (file, callback) => {
  const ret = {
    dirname : dirname(file.relative),
    filename: replaceExtension(basename(file.relative), '.html'),
    relative: (path) => {
      const isDirectory = path.match(/^.+\/$/) ? true : false;
      const pathName    = relative(ret.dirname, path);
      return (() => {
        if(pathName) {
          return isDirectory ? `${ pathName }/` : pathName;
        } else {
          return './';
        }
      })();
    },
    isProduction: isProduction,
  };
  callback(null, ret);
};

gulp.task('pug', (done) => {
  return pugTask(join(PUG_SRC, '/**/*.pug'), PUG_DEST, true, done);
});

gulp.task('pug-all', (done) => {
  if(viewingPage) {
    const path = `${ viewingPage.match(/^(.+)(\.)(html|php)$/)[1] }.pug`;
    const dest = viewingPage.match(/^(.*\/)(.+\.)(html|php)$/)[1];
    pugTask(join(PUG_SRC, path), join(PUG_DEST, dest), false);
    return pugTask([join(PUG_SRC, '/**/*.pug'), join(PUG_SRC, `!${ path }`)], PUG_DEST, false, done);
  } else {
    return pugTask(join(PUG_SRC, '/**/*.pug'), PUG_DEST, false, done);
  }
});

gulp.task('pug-factory', (done) => {
  return pugFactoryTask(true, done);
});

gulp.task('pug-factory-all', (done) => {
  return pugFactoryTask(false, done);
});

const pugOpts = {
  pug   : pug,
  pretty : true,
  // pretty : !isProduction,
  basedir: join(__dirname, PUG_BASE),
  filters: {
    'do-nothing': (block) => {
      const indentData     = block.match(/^\{\{indent=([0-9])\}\}\n/);
      const block_ = (() => {
        if(indentData) {
          const block__ = block.replace(indentData[0], '');
          let indent_ = '';
          for(let i = 0; indentData[1] > i; i++) indent_ += ' ';
          return indent_ + block__.replace(/\n/g, `\n${ indent_ }`);
        } else {
          return block;
        }
      })();
      return `\n${ block_ }`
    },
  },
};

// const pugExtensonChangeFilter = ['*'];

const pugTask = (srcPath, destPath, isSrcDirUpdate, done = null) => {
  return (() => {
    gulp.src(srcPath)
      .pipe(plumber(PLUMBER_OPTS))
      .pipe(gulpif(isSrcDirUpdate, cache('pug')))
      .pipe(data(pugMember))
      .pipe(gulpPug(pugOpts))
      // .pipe(crLfReplace({ changeCode: 'CR+LF' }))
      // .pipe(gulpif(isProduction, iconv({ encoding: 'shift_jis' })))
      .pipe(gulp.dest(destPath))
      // .pipe(filter(pugExtensonChangeFilter))
      // .pipe(extensonChange({
      //   afterExtension: 'php',
      //   copy: true,
      // }))
      // .pipe(gulp.dest(PUG_DEST))
      .on('end', () => {
        if(done) done();
      });
  })();
};

const pugFactoryTask = (isJsonFileUpdate, done) => {
  return (() => {

    const factory = () => {
      const transform = function(data, encode, callback) {
        const tmps = JSON.parse(data.contents.toString());
        forEach(tmps, (pages, tmpPath) => {
          forEach(pages, (page, destPath) => {
            const vals = reduce(page, (memo, val, key) => {
              return `${ memo }  - var ${ key } = '${ val }'\n`;
            }, '');
            const tmpContent = fs.readFileSync(join(PUG_BASE, tmpPath)).toString().split('{{vars}}');
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

    gulp.src(join(PUG_FACTORY, '/**/*.json'))
      .pipe(plumber(PLUMBER_OPTS))
      .pipe(gulpif(isJsonFileUpdate, cache('pug-factory')))
      .pipe(factory())
      .pipe(data(pugMember))
      .pipe(gulpPug(pugOpts))
      .pipe(gulp.dest(PUG_DEST))
      .on('end', done);

  })();
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
  return (() => {

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
  })();
};


/**
 * css sprite images
 */
gulp.task('sprite', (done) => {
  return (() => {

    if(!isSpritesChanged) {
      done();
      return;
    }

    isSpritesChanged = false;

    const imageDest = isProduction ? IMAGEMIN_SRC : SPRITE_DEST;

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
      .pipe(gulpif('*.png', gulp.dest(imageDest)))
      .on('end', done)
      .pipe(gulpif('*.styl', cache('stylus')))
      .pipe(gulpif('*.styl', gulp.dest(SPRITE_CSS_DEST)));

  })();
});


/**
 * imagemin
 */
gulp.task('imagemin', (done) => {

  if(!isImagesChanged) return;

  const rs = runSequence(
    [ 'imagemin-png', 'imagemin-jpg', 'imagemin-gif', 'imagemin-svg' ],
    done
  );
  isImagesChanged = false
  return rs;

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
    return (() => {
      gulp.src(join(IMAGEMIN_SRC, `/**/*.${ val.extension }`))
        .pipe(plumber(PLUMBER_OPTS))
        .pipe(changed(IMAGEMIN_DEST))
        .pipe(imagemin(val.opts))
        .pipe(gulp.dest(IMAGEMIN_DEST))
        .on('end', done);
    })();
  });
});


/**
 * webpack (JavaScript)
 */
gulp.task('webpack-first', (done) => {
  return (() => {
    bower()
      .once('end', () => {
        runSequence('webpack', done);
      });
  })();
});

gulp.task('webpack', (done) => {
  return webpackTask(true, done);
});

gulp.task('webpack-all', (done) => {
  return webpackTask(false, done);
});

const webpackTask = (isSrcDir, done) => {
  return (() => {

    const webpackOpts = () => {
      const opts = {
        resolve: {
          root      : [ join(__dirname, 'bower_components') ],
          extensions: [ '', '.js' ],
          alias: {
            // 'es6-promise': 'es6-promise/es6-promise.min',
            // 'lodash'     : 'lodash/dist/lodash.min',
            // 'Velocity'   : 'velocity/velocity.min',
            // 'Velocity.ui': 'velocity/velocity.ui.min',
          },
        },
        module: {
          loaders: [
            {
              test   : /\.js$/,
              loader : 'babel',
              query  : {
                presets: [ 'es2015', 'stage-0' ],
                plugins: [ 'transform-object-assign' ],
              },
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

  })();
};


/**
 * javascript test
 */
gulp.task('test', (done) => {
  watch([ join(TEST_SRC , '/**/*') ], () => gulp.start('test'));
  karma.server.start({ configFile: TEST_CONFIG_SRC }, done);
});


/**
 * url list
 */
gulp.task('url-list', (done) => {
  return recursive(DEST_ROOT, ['!*.+(html|php)'], (err, files) => {
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
  return (() => {
    del([ './**/.DS_Store', './**/Thumb.db', './htdocs/url-list.html', './htdocs/**/*.map' ])
      .then(() => done());
  })();
});
