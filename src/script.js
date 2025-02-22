import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
    //console.log(event.clientX, event.clientY)
})


/**
 * Object
 */

// const mesh = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// scene.add(mesh)

//axes helper
const loader = new GLTFLoader()
const fyodorLogo = new THREE.Object3D()
const fyodorLogoLoader = new GLTFLoader()
fyodorLogoLoader.load(
    'fyodor.glb',
    (gltf) => {
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const size = box.getSize(new THREE.Vector3())
        const scale = 1 / size.length() * 2
    
        gltf.scene.scale.set(scale, scale, scale)
        fyodorLogo.add(gltf.scene)
        scene.add(fyodorLogo)
    }
)


const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
//camera.lookAt(mesh.position)
scene.add(camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor( 0xffff99, 1);
const clock = new THREE.Clock()
//Animation
const tick  = () => {
    
    const elapsedTime = clock.getElapsedTime()

    //update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 6
    // camera.lookAt(mesh.position)
    //mesh.rotation.y = elapsedTime
    fyodorLogo.rotation.y = elapsedTime
    //update controls
    controls.update()

    
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
   

}

tick()