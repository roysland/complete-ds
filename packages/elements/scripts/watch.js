import esbuild from 'esbuild'
import Sass from 'sass'
import { litCssPlugin } from 'esbuild-plugin-lit-css';

import litPlugin from 'esbuild-plugin-lit'
esbuild.build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: './dist/bundle.js',
    watch: true,
    plugins: [
        litPlugin(),
        litCssPlugin({
            filter: /.scss$/,
            transform: (data, { filePath }) =>
                Sass.renderSync({ data, file: filePath })
                    .css.toString(),
        })],
}).catch((e) => console.error(e.message))