import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//textures
const textureLoader = new THREE.TextureLoader()
//const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
//const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

//doorColorTexture.colorSpace = THREE.sRGBEncoding
//matcapTexture.colorSpace = THREE.sRGBEncoding

//axeshelper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

/**
 * Object
 */
const doorColorTexture = textureLoader.load(
    '/textures/door/color.jpg',
    () => {
        console.log('Texture loaded successfully');
        doorColorTexture.colorSpace = THREE.SRGBColorSpace;
    })
const matcapTexture = textureLoader.load(
    '/textures/matcaps/8.png',
    () => {
        console.log('Texture loaded successfully');
        matcapTexture.colorSpace = THREE.SRGBColorSpace;
    })

const material = new THREE.MeshBasicMaterial()
material.map = doorColorTexture

const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)
const torusMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.2, 16, 32),
    material
)

//transforms
sphereMesh.position.x = -1.5
planeMesh.position.x = 0
torusMesh.position.x = 1.5

//add to scene
scene.add(sphereMesh, planeMesh, torusMesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    //rotation
    sphereMesh.rotation.x = 0.15* elapsedTime
    planeMesh.rotation.x = 0.15* elapsedTime
    torusMesh.rotation.x = 0.15* elapsedTime

    sphereMesh.rotation.y = 0.1* elapsedTime
    planeMesh.rotation.y = 0.1* elapsedTime
    torusMesh.rotation.y = 0.1* elapsedTime

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()