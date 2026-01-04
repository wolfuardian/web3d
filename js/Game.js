import { InputManager } from './input.js';
import { BeatManager } from './Beat.js';

class RhythmGame {
    constructor() {
        this.inputManager = new InputManager();
        this.audioContext = new AudioContext();
        this.beatManager = new BeatManager( 120, this.audioContext ); // 120 BPM
        this.accuracyJudge = new AccuracyJudge();

        // Three.js 基礎設置
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.notes = []; // 儲存音符物件
        this.lastTime = 0;
    }

    update( timestamp ) {
        const deltaTime = ( timestamp - this.lastTime ) / 1000;
        this.lastTime = timestamp;

        // 處理輸入
        const inputs = this.inputManager.getInputsThisFrame();
        inputs.forEach( input => {
            this.checkNoteHit( input.timestamp );
        } );

        // 更新音符位置
        this.updateNotes( deltaTime );

        // 渲染場景
        this.renderer.render( this.scene, this.camera );

        requestAnimationFrame( ( t ) => this.update( t ) );
    }

    checkNoteHit( inputTime ) {
        // 找到最接近的音符並判定
        const currentBeat = this.beatManager.getCurrentBeat();
        // 實作音符命中邏輯...
    }

    updateNotes( deltaTime ) {
        // 根據音樂時間更新音符位置
        this.notes.forEach( note => {
            // 計算音符應該在的位置
            const timeToBeat = this.beatManager.getTimeToBeat( note.beatNumber );
            note.mesh.position.z = timeToBeat * 0.01; // 根據時間調整位置
        } );
    }

    start() {
        this.beatManager.start();
        this.lastTime = performance.now();
        this.update( this.lastTime );
    }
}

export { RhythmGame };
