const rollup = require('rollup');
import babel from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify";
import { nodeResolve } from '@rollup/plugin-node-resolve';
const commonjs = require('@rollup/plugin-commonjs');

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

const onwarn = function (message) {
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (/The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten./.test(message)) {
        return;
    }
    console.error(message);
}

const plugins = [
    nodeResolve({browser: true, extensions}),
    commonjs({
        include: 'node_modules/**',
    }),
    babel({ babelHelpers: 'bundled', extensions, plugins: ['@babel/plugin-transform-async-to-generator'] }),
    uglify(),
];

const input = 'src/app/run/run.ts';

const inputOptions = {
    input,
    plugins,
    onwarn,
};
const outputOptions = {
    format: 'umd',
    dir: 'output'
};

async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);
  
    console.log(bundle.watchFiles); // an array of file names this bundle depends on
  
    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    const { output } = await bundle.generate(outputOptions);
  
    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === 'asset') {
        // For assets, this contains
        // {
        //   fileName: string,              // the asset file name
        //   source: string | Uint8Array    // the asset source
        //   type: 'asset'                  // signifies that this is an asset
        // }
        console.log('Asset', chunkOrAsset);
      } else {
        // {
        //   code: string,                  // the generated JS code
        //   name: string                   // the name of this chunk as used in naming patterns
        //   type: 'chunk',                 // signifies that this is a chunk
        // }
        // console.log('Chunk', chunkOrAsset.modules);
        // console.log('Code', chunkOrAsset.code);
      }
    }
    return output[0]['code'];  
  }
  
  export {build};