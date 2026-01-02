import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as t from './threeJS/functions.js';

class App {

    constructor() {
        this.scene = null;

        this.initRenderer();
        this.initCamera();
        this.initControls();

        window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

        // 3. 開始載入場景
        this.loadScene();

    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.75;

        document.body.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.set( 0, 100, 100 );
        this.camera.layers.enableAll();
    }

    initControls() {
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.copy( new THREE.Vector3( 0, 0, 0 ) );
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.panSpeed = 0.4;
        this.controls.enableDamping = true; // 記得在 animate 中 update
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 1;
    }

    loadScene() {
        const loader = new THREE.ObjectLoader();

        loader.load(
            'scene/Scene.json',
            ( loadedScene ) => {
                this.scene = loadedScene;
                this.scene.updateMatrixWorld( true );

                this.setupSceneObjects();

                this.scene.background = null;

                this.animate();
            },
            undefined,
            ( err ) => {
                console.error( 'An error happened loading the scene:', err );
            }
        );
    }

    setupSceneObjects() {

        if ( this.scene === null ) return;

        this.scene.traverse( ( object ) => {

            switch ( object.name ) {

                case 'MainCamera':

                    this.camera.position.copy( object.position )
                    this.camera.fov = object.fov;
                    this.camera.near = object.near;
                    this.camera.far = object.far;
                    this.camera.updateProjectionMatrix();

                    break;

            }

            switch ( object.type ) {

                case 'Reference':

                    if ( object.userData.src && object.userData.src.includes( ".glb" ) ) {

                        t.LoadGLBModel( object.userData.src, ( result ) => {

                            if ( result ) {

                                this.scene.add( result );

                            }
                        } );
                    }

                    break;
            }
        } );
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    animate() {
        // 使用 bind(this) 確保 requestAnimationFrame 呼叫時上下文正確
        requestAnimationFrame( this.animate.bind( this ) );

        // 更新控制器 (因為開啟了 enableDamping)
        this.controls.update();

        this.render();
        this.inspect();
    }

    render() {

        if ( this.scene === null || this.camera === null ) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.renderer.setScissorTest( true );

        // Left side
        this.renderer.setScissor( 0, 0, width / 2, height );
        this.renderer.setViewport( 0, 0, width / 2, height );
        this.renderer.render( this.scene, this.camera );

        // Right side
        this.renderer.setScissor( width / 2, 0, width / 2, height );
        this.renderer.setViewport( width / 2, 0, width / 2, height );
        this.renderer.render( this.scene, this.camera );

        this.renderer.setScissorTest( false );
    }

    inspect() {
    }
}

new App();
