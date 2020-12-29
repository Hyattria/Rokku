/**
 * Build style entry of all components
 */
import { sep, join, relative } from 'path';
import { outputFileSync } from 'fs-extra';
import { existsSync } from 'fs';
import { replaceExt } from '../common';
import { CSS_LANG, getCssBaseFile } from '../common/css';
import { checkStyleExists } from './gen-style-deps-map';
import {
  ES_DIR,
  SRC_DIR,
  LIB_DIR,
  STYPE_DEPS_JSON_FILE,
} from '../common/constant';

function getDeps(component: string): string[] {
  const styleDepsJson = require(STYPE_DEPS_JSON_FILE);

  if (styleDepsJson.map[component]) {
    const deps = styleDepsJson.map[component].slice(0);

    if (checkStyleExists(component)) {
      deps.push(component);
    }

    return deps;
  }

  return [];
}

function getPath(component: string, ext = '.css') {
  return join(ES_DIR, `${component}/style/index${ext}`);
}

function getRelativePath(component: string, style: string, ext: string) {
  const relativePath = relative(
    join(ES_DIR, `${component}/style`),
    getPath(style, ext)
  );
  if (!existsSync(relativePath) && relativePath.indexOf('/') === -1) {
    return `./${relativePath}`;
  }
  return relative(join(ES_DIR, `${component}/style`), getPath(style, ext));
}

const OUTPUT_CONFIG = [
  {
    dir: ES_DIR,
    template: (dep: string) => `import '${dep}';`,
  },
  {
    dir: LIB_DIR,
    template: (dep: string) => `require('${dep}');`,
  },
];

function genEntry(params: {
  ext: string;
  filename: string;
  component: string;
  baseFile: string | null;
}) {
  const { ext, filename, component, baseFile } = params;
  const deps = getDeps(component);
  const depsPath = deps.map((dep) => getRelativePath(component, dep, ext));

  OUTPUT_CONFIG.forEach(({ dir, template }) => {
    const outputDir = join(dir, component, 'style');
    const outputFile = join(outputDir, filename);

    let content = '';

    if (baseFile) {
      const compiledBaseFile = replaceExt(baseFile.replace(SRC_DIR, dir), ext);
      content += template(relative(outputDir, compiledBaseFile));
      content += '\n';
    }
    content += depsPath.map(template).join('\n');
    content = content.replace(new RegExp(`\\${sep}`, 'g'), '/');
    outputFileSync(outputFile, content);
  });
}

export function genComponentStyle(
  component: string,
  options: { cache: boolean } = { cache: true }
) {
  if (!options.cache) {
    delete require.cache[STYPE_DEPS_JSON_FILE];
  }
  const baseFile = getCssBaseFile();

  genEntry({
    baseFile,
    component,
    filename: 'index.js',
    ext: '.css',
  });

  if (CSS_LANG !== 'css') {
    genEntry({
      baseFile,
      component,
      filename: `${CSS_LANG}.js`,
      ext: `.${CSS_LANG}`,
    });
  }
}
