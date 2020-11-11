/* eslint-disable class-methods-use-this */
import { Compiler } from 'webpack';
import { replaceExt } from '../common';
import { CSS_LANG } from '../common/css';
import { genPacakgeStyle } from './gen-package-style';
import { genSiteMobileShared } from './gen-site-mobile-shared';
import { genSiteDesktopShared } from './gen-site-desktop-shared';
import { genStyleDepsMap } from './gen-style-deps-map';
import { PACKAGE_STYLE_FILE } from '../common/constant';

const PLUGIN_NAME = 'RokkuCliSitePlugin';

async function genSiteEntry() {
  genStyleDepsMap().then(() => {
    genPacakgeStyle({
      outputPath: replaceExt(PACKAGE_STYLE_FILE, `.${CSS_LANG}`),
    });
    genSiteMobileShared();
    genSiteDesktopShared();
  });
}

export class RokkuCliSitePlugin {
  apply(compiler: Compiler) {
    if (process.env.NODE_ENV === 'production') {
      compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, genSiteEntry);
    } else {
      compiler.hooks.watchRun.tapPromise(PLUGIN_NAME, genSiteEntry);
    }
  }
}
