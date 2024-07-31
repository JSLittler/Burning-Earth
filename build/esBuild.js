import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

const configuration = {
    entryPoints: ['./src/index.js'],
    format: 'esm',
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['es2023'],
    outdir: './public/dist',
    loader: {
        '.svg': 'text',
        '.png': 'dataurl',
        '.js': 'jsx',
        '.js_commonjs-proxy': 'jsx',
    },
    plugins: [
      sassPlugin({
        filter: /\.module\.scss$/,
        type: 'style'
      }),
    ],
    define: {
        'process.env.NODE_ENV': "'production'", //can set environments here
    },
};

const executeEsBuild = async () => {
  await esbuild.build({
    ...configuration
  });
};

(async () => await executeEsBuild().then(() => {
  console.log('ESBuild ended');
}))();