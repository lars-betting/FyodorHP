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

// const geometry = new THREE.BufferGeometry()

// const count = 500
// const positionsArray = new Float32Array(count * 3 * 3)
// for(let i = 0; i < count * 3 * 3; i++) {
//     positionsArray[i] = (Math.random() - 0.5) * 4
// }
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)

// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
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
    scene.add(axesHelper)
    /**
     * Sizes
    */
   const sizes = {
       width: window.innerWidth,
       height: window.innerHeight
    }
    window.addEventListener('resize', () => 
    {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)
    })
    window.addEventListener('keypress', (event) => {
    if (event.key === 'f') {
        if(document.fullscreenElement) { //might not work on safari
            document.exitFullscreen()
        }
        else {
            canvas.requestFullscreen()
        }
        
    }})
    
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)
renderer.setClearColor( 0xffff99, 1)
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
    //fyodorLogo.rotation.y = elapsedTime
    //update controls
    controls.update()

    
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
   

}

tick()