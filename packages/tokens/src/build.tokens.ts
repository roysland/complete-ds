import * as ts from 'typescript';
import * as fs from 'fs';
import * as csso from 'csso';
import { baseTheme } from './tokens';
import { Token } from './token-utils';

const tokens: Token[] = Object.entries(flattenTokens(baseTheme)).map(token => token[1]);
const experimental = `This token format is currently experimental and may change in the future`;

fs.mkdirSync('./dist/styles/', { recursive: true });
// fs.mkdirSync('./src/styles/tokens/generated', { recursive: true });

// Public API Tokens
buildCSSTokens('./dist/module.tokens.scss');
buildJSONTokens('./dist/tokens.json');
buildJSTokens('./dist/tokens.ts');
buildSassTokens('./dist/tokens.scss');

// Internal API Tokens for custom elements with fallback values
// buildInternalSassTokens('./src/styles/tokens/generated/_index.scss?inline');


function buildJSTokens(path) {
  fs.writeFileSync(
    path,
    `// ${experimental}\n${tokens
      .map(t => `export const ${t.name} = '${convertCSSValue(t, false)}';`)
      .join('\n')}`
  );

  const options = {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
  };
  ts.createProgram([path], options).emit();
  fs.renameSync(path, path.replace('.ts', '.js'));
}

function buildJSONTokens(path) {
  fs.writeFileSync(path, JSON.stringify(flattenTokens(baseTheme), null, 2));
}

function buildSassTokens(path) {
  const values = tokens
    .map(token => `${tokenToSass(token)}\n`)
    .join('')
    .trim();
  fs.writeFileSync(path, `// ${experimental}\n${values}`);
}

function buildCSSTokens(path) {
  const cssTokens = `
:root {
${tokens.map(token => `  ${getTokenCSSName(token)}: ${convertCSSValue(token, false)};`).join('\n')}
}`;

  fs.writeFileSync(path, cssTokens);
  fs.writeFileSync(path.replace('.css', '.min.css'), csso.minify(cssTokens).css);
}

function buildInternalSassTokens(path) {
  fs.writeFileSync(
    path,
    `
    ${tokens
    .map(token => `${tokenToSass(token, true)}\n`)
    .join('')
    .trim()}
    `
  );
}

function tokenToSass(token: Token, fallback = false) {
  const propName = camelCaseToKebab(token.name);
  let fallbackValue = convertCSSValue(token);

  if (typeof token.value === 'number') {
    fallbackValue = `calc(${token.value} * (1rem / var(--global-base, 20)))`;
  }

  if (token.config.raw) {
    fallbackValue = token.value;
  }

  const dynamicValue = `$${propName}: ${convertCSSValue(token, false)}${
    fallback ? `, ${fallbackValue}` : ''};`;
  const staticValue =
    token.config.static || typeof token.value === 'number' ? `\n$${propName}-static: ${token.value} !default;` : '';

  return `${dynamicValue}${staticValue}`;
}

function flattenTokens(theme: any) {
  function flatten(config: any, parent = ''): { [key: string]: Token } {
    return Object.entries(config)
      .map(([key, value]: [string, any]) => {
        if (typeof value === 'object' && !(value instanceof Token)) {
          return flatten(value, `${parent}${key[0].toUpperCase() + key.slice(1)}`);
        }

        value.name = `${parent[0].toLowerCase() + parent.slice(1)}${key[0].toUpperCase() + key.slice(1)}`
          .replace('aliases', 'alias')
          .replace('Value', '');
        return { [value.name]: value };
      })
      .reduce((prev, next) => ({ ...prev, ...next }), {});
  }

  return flatten(theme);
}

function convertCSSValue(token: Token, fallback = true) {
  let value = token.value;

  if (token.alias instanceof Token) {
    value = `var(--${camelCaseToKebab(token.alias.name)}${
      fallback ? `, ${convertCSSValue(token.alias, fallback)}` : ''
    })`;
  } else if (token.config.raw) {
    value = token.value;
  } else if (token.config.scale) {
    value = `calc(${token.value} * var(--${camelCaseToKebab(token.config.scale.name)}))`;
  } else if (typeof token.value === 'number') {
    value = `calc(${token.value} * (1rem / var(--global-base)))`;
  } else if (isHSL(token.value)) {
    value = `hsl(${token.value[0]}, ${token.value[1]}%, ${token.value[2]}%)`;
  }

  return value;
}

function getTokenCSSName(token: Token) {
  return `--${camelCaseToKebab(token.name)}`;
}

function camelCaseToKebab(val: string) {
  return val.replace(/([A-Z]|\d+)/g, '-$1').toLocaleLowerCase();
}

function isHSL(value: any) {
  return Array.isArray(value) && value.length === 3;
}

function hslToRgb(h: number, s: number, l: number) {
  s = s / 100;
  l = l / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: any, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(red: number, green: number, blue: number) {
  const r = red.toString(16);
  const g = green.toString(16);
  const b = blue.toString(16);
  return `#${r.length === 1 ? '0' : ''}${r}${g.length === 1 ? '0' : ''}${g}${b.length === 1 ? '0' : ''}${b}`;
}
