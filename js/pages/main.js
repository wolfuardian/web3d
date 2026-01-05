import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;



let mesh, renderer, scene, camera;


// 建立渲染器
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 建立場景

scene = new THREE.Scene();

// 建立攝影機
camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 5, 5, 5 );
scene.add( camera );


const controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;


// 建立立方體
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// 建立燈光
const light1 = new THREE.PointLight( 0x00ffff, 10, 100 );
light1.position.set( 5, 0, 0 );
scene.add( light1 );
const light2 = new THREE.PointLight( 0xff00ff, 10, 100 );
light2.position.set( 0, 5, 0 );
scene.add( light2 );
const light3 = new THREE.PointLight( 0xffff00, 10, 100 );
light3.position.set( 0, 0, 5 );
scene.add( light3 );


function render() {

    renderer.render( scene, camera );

}

// 建立 UI 介面
createUI();


// 渲染循環
function animate() {
    requestAnimationFrame( animate );

    // 讓立方體旋轉
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
}

animate();

// UI 建立函數
function createUI() {
    // 建立 UI 容器
    const uiContainer = document.createElement( 'div' );
    uiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild( uiContainer );

    // 建立標題
    const title = document.createElement( 'h1' );
    title.textContent = 'Three.js 場景控制';
    title.style.cssText = `
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
        color: #2c3e50;
        font-size: 32px;
        font-weight: 600;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        letter-spacing: 1px;
        pointer-events: none;
    `;
    uiContainer.appendChild( title );

    // 建立按鈕容器
    const buttonContainer = document.createElement( 'div' );
    buttonContainer.style.cssText = `
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 20px;
        pointer-events: auto;
    `;
    uiContainer.appendChild( buttonContainer );

    // 按鈕樣式
    const buttonStyle = `
        padding: 14px 32px;
        background-color: #34495e;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    `;

    // 配置檔案
    const config = {
        version: new Date().getTime(),
        links: [
            { href: 'html/rhythm.html', text: '節奏遊戲', icon: '🎵' },
            { href: 'html/game.html', text: '開始遊戲', icon: '🎮' },
            { href: 'html/3d.html', text: '3D測試', icon: '🎨' }
        ]
    };

    // 建立三個按鈕
    const button1 = createButton( 'Page1', buttonStyle, () => {
        window.location.href = 'html/rhythm.html';
    } );

    const button2 = createButton( 'Page2', buttonStyle, () => {
        window.location.href = `html/game.html`;
    } );

    const button3 = createButton( 'Page3', buttonStyle, () => {
        window.location.href = 'html/3d.html';
    } );

    buttonContainer.appendChild( button1 );
    buttonContainer.appendChild( button2 );
    buttonContainer.appendChild( button3 );
}

// 按鈕建立輔助函數
function createButton( text, style, onClick ) {
    const button = document.createElement( 'button' );
    button.textContent = text;
    button.style.cssText = style;

    // 懸停效果
    button.addEventListener( 'mouseenter', () => {
        button.style.backgroundColor = '#2c3e50';
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    } );

    button.addEventListener( 'mouseleave', () => {
        button.style.backgroundColor = '#34495e';
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
    } );

    // 點擊效果
    button.addEventListener( 'mousedown', () => {
        button.style.transform = 'translateY(0)';
    } );

    button.addEventListener( 'click', onClick );

    return button;
}



// // 導覽列生成器
// class NavigationBuilder {
//     constructor( containerId, links, version ) {
//         this.container = document.getElementById( containerId );
//         this.links = links;
//         this.version = version;
//     }
//
//     build() {
//         const nav = document.createElement( 'ul' );
//         nav.className = 'nav-list';
//
//         this.links.forEach( link => {
//             const li = document.createElement( 'li' );
//             const a = document.createElement( 'a' );
//
//             a.href = `${ link.href }?v=${ this.version }`;
//             a.className = 'nav-link';
//             a.innerHTML = `<span class="icon">${ link.icon }</span>${ link.text }`;
//
//             // 添加平滑過渡效果
//             a.addEventListener( 'mouseenter', this.handleHover );
//
//             li.appendChild( a );
//             nav.appendChild( li );
//         } );
//
//         this.container.appendChild( nav );
//     }
//
//     handleHover( e ) {
//         e.target.style.transform = 'translateX(5px)';
//     }
// }
//
// // 初始化
// document.addEventListener( 'DOMContentLoaded', () => {
//     const navBuilder = new NavigationBuilder(
//         'main-nav',
//         config.links,
//         config.version
//     );
//     navBuilder.build();
// } );
