import * as THREE from "three";
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Mode } from "./types"

const modelPath = "/models/glb/map_attribs_14.glb"

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let map
let light
let sun
let objects: THREE.Object3D

function createScene(container: HTMLElement): HTMLCanvasElement {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    createObjectsFromGLTF()

    //createCamera(container.clientWidth / container.clientHeight)
    //createCameraControls()

    return renderer.domElement
}

function createCamera(aspect: number) {
    camera = new THREE.PerspectiveCamera(
        75,
        aspect,
        0.1,
        1000,
    );
    camera.position.z = 5;
}

function createCameraControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    //TODO min max zom and angles
}


async function createObjectsFromGLTF() {
    const gltf: GLTF = await loadGLTF();

    camera = gltf.scene.getObjectByName("cam_0") as THREE.PerspectiveCamera
    camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight
    camera.updateProjectionMatrix();
    scene.add(camera);
    createCameraControls()

    map = gltf.scene.getObjectByName("map_tri") as THREE.Mesh
    let mapMaterial = map.material as THREE.MeshStandardMaterial
    mapMaterial.depthWrite = true

    scene.add(map);

    light = gltf.scene.getObjectByName("point") as THREE.Object3D
    scene.add(light);

    sun = gltf.scene.getObjectByName("sun") as THREE.Object3D
    scene.add(sun);

    let am = gltf.scene.getObjectByName("aiguille_du_midi") as THREE.Object3D
    scene.add(am);

    let train = gltf.scene.getObjectByName("train") as THREE.Object3D
    scene.add(train);

}

async function loadGLTF() {
    const loader = new GLTFLoader();
    return await loader.loadAsync(modelPath, () => { });
}

function update() {
    if (controls) controls.update();
    if (renderer && camera) renderer.render(scene, camera);

}

function startAnimationLoop() {
    renderer.setAnimationLoop(update)
}

function pauseAnimationLoop() {
    renderer.setAnimationLoop(null)
}

function resize(container: HTMLElement) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function clear() {
    pauseAnimationLoop()
    renderer.dispose()
}

function changeMode(mode: Mode) {
    //TODO
    //if (cube) {
    //    if (mode === Mode.Summer) {
    //        (cube.material as THREE.MeshStandardMaterial).color.set(
    //            0x00ff00,
    //        ); // green
    //    } else if (mode === Mode.Winter) {
    //        (cube.material as THREE.MeshStandardMaterial).color.set(
    //            0xffffff,
    //        ); // white
    //    }
    //}
}

export { createScene, startAnimationLoop, pauseAnimationLoop, resize, clear, changeMode }