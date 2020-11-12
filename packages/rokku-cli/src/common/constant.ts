/* eslint-disable global-require */
import { get } from 'lodash';
import { existsSync } from 'fs-extra';
import { join, dirname, isAbsolute } from 'path';

function findRootDir(dir: string): string {
  if (dir === '/') {
    return '/';
  }
  if (existsSync(join(dir, 'rokku.config.js'))) {
    return dir;
  }
  return findRootDir(dirname(dir));
}

// Colors
export const GREEN = '#07c160';

// Root paths
export const CWD = process.cwd();
export const ROOT = findRootDir(CWD);
export const ES_DIR = join(ROOT, 'es');
export const LIB_DIR = join(ROOT, 'lib');
export const DOCS_DIR = join(ROOT, 'docs');
export const DOC_DIST_DIR = join(ROOT, 'docs-dist');
export const ROKKU_CONFIG_FILE = join(ROOT, 'rokku.config.js');
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json');
export const ROOT_WEBPACK_CONFIG_FILE = join(ROOT, 'webpack.config.js');
export const ROOT_POSTCSS_CONFIG_FILE = join(ROOT, 'postcss.config.js');
export const CACHE_DIR = join(ROOT, 'node_modules/.cache');

// Relative paths
export const DIST_DIR = join(__dirname, '../../dist');
export const SITE_DIR = join(__dirname, '../../site');
export const CONFIG_DIR = join(__dirname, '../config');

// Site files
export const SITE_MOBILE_COMPONENTS = join(SITE_DIR, 'mobile', 'components');

// Dist files
export const PACKAGE_ENTRY_FILE = join(DIST_DIR, 'package-entry.js');
export const PACKAGE_STYLE_FILE = join(DIST_DIR, 'package-style.css');
export const SITE_MODILE_SHARED_FILE = join(DIST_DIR, 'site-mobile-shared.js');
export const SITE_DESKTOP_SHARED_FILE = join(
  DIST_DIR,
  'site-desktop-shared.js'
);
export const SITE_MODILE_DEMO_FILE = join(DIST_DIR, 'site-mobile-demo.js');
export const STYPE_DEPS_JSON_FILE = join(DIST_DIR, 'style-deps.json');

// Config files
export const BABEL_CONFIG_FILE = join(CONFIG_DIR, 'babel.config.js');
export const POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js');
export const JEST_SETUP_FILE = join(CONFIG_DIR, 'jest.setup.js');
export const JEST_CONFIG_FILE = join(CONFIG_DIR, 'jest.config.js');
export const JEST_TRANSFORM_FILE = join(CONFIG_DIR, 'jest.transform.js');
export const JEST_FILE_MOCK_FILE = join(CONFIG_DIR, 'jest.file-mock.js');
export const JEST_STYLE_MOCK_FILE = join(CONFIG_DIR, 'jest.style-mock.js');

export const SCRIPT_EXTS = ['.js', '.jsx', '.ts', '.tsx'];
export const STYLE_EXTS = ['.css', '.less', '.scss'];

export function getPackageJson() {
  delete require.cache[PACKAGE_JSON_FILE];

  return require(PACKAGE_JSON_FILE);
}

export function getRokkuConfig() {
  delete require.cache[ROKKU_CONFIG_FILE];

  try {
    return require(ROKKU_CONFIG_FILE);
  } catch (err) {
    return {};
  }
}

function getSrcDir() {
  const rokkuConfig = getRokkuConfig();
  const srcDir = get(rokkuConfig, 'build.srcDir');

  if (srcDir) {
    if (isAbsolute(srcDir)) {
      return srcDir;
    }
    return join(ROOT, srcDir);
  }
  return join(ROOT, 'src');
}

export const SRC_DIR = getSrcDir();
export const STYLE_DIR = join(SRC_DIR, 'styles');
