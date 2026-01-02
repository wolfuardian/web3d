import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function LoadGLBModel( url, onLoad ) {

    try {

        const loader = new GLTFLoader();
        loader.load( url, function ( gltf ) {

            onLoad( gltf.scene )

        } )
    } catch ( error ) {

        console.log( `Error Loading GLB Model.${ error }` );

    }
}

export { LoadGLBModel };
