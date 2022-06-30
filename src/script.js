import './style.css'
import './assets.js'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'

const gui = new lil.GUI()
gui.open(false)

const canvas = document.querySelector('canvas.webgl') 

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

// Text
const fontLoader = new FontLoader()

const name = 'Mr Joe'
const letterDistance = 1
const singleLetter = []
const textGroup = new THREE.Group()
textGroup.position.x = - 0.6
scene.add(textGroup)

gui.add(textGroup.position, 'x', - 2, 2, 0.1).name('POSITION X')
gui.add(textGroup.scale, 'x', 0, 2, 0.1).name('SCALE X')
gui.add(textGroup.scale, 'y', 0, 2, 0.1).name('SCALE Y')
gui.add(textGroup.scale, 'z', 0, 2, 0.1).name('SCALE Z')

const material = new THREE.MeshStandardMaterial({
    wireframe: true
})

fontLoader.load('fonts/helvetiker_regular.typeface.json', font => {
    for (let i = 0; i < 6; i++) {
        const letter = new THREE.Mesh(
            new TextGeometry(name[i], {
                font: font,
                size: 0.2,
                height: 0.05,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.001,
                bevelOffset: 0,
                bevelSegments: 0.5
            }),
            material
        )
    
        letter.position.x = 0.2 * (i === 0 ? - 0.3 : i)
        letter.position.y = - letterDistance * i

        letter.castShadow = true 
        
        singleLetter.push(letter)
        textGroup.add(letter)
    }
})

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshStandardMaterial()
)
plane.quaternion.setFromAxisAngle(new THREE.Vector3(- 1, 0, 0), Math.PI * 0.5)
plane.position.y = - letterDistance * 6
plane.receiveShadow = true 
scene.add(plane)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) 
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.8, 0, 1) 
pointLight.position.set(0.2, - 2, 2.4)
pointLight.castShadow = true 
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 6
scene.add(pointLight)

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
pointLightCameraHelper.visible = false
scene.add(pointLightCameraHelper)

gui.addColor(pointLight, 'color')
gui.add(pointLight, 'intensity', 0, 5, 0.1)
gui.add(pointLight, 'decay', 0, 5, 0.1)
gui.add(pointLight, 'distance', 0, 5, 0.1)
gui.add(pointLight.position, 'x', - 2, 2, 0.1)
gui.add(pointLight.position, 'y', - 2, 2, 0.1)
gui.add(pointLight.position, 'z', - 2, 5, 0.1)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 1
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2)) 
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// const orbitControls = new OrbitControls(camera, canvas)
// orbitControls.enableDamping = true

let scrollY = - window.scrollY / sizes.height

window.addEventListener('scroll', () => {
    scrollY = - window.scrollY / sizes.height
})

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)) 
})

const clock = new THREE.Clock() 

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // orbitControls.update()

    camera.position.y = scrollY
    
    setTimeout(() => {
        if (singleLetter[0].position.y > - 1) {
            singleLetter[0].position.y = scrollY
        } else if (singleLetter[0].position.y <= - 0.98 && singleLetter[0].position.y > - 2.98) {
            singleLetter[0].position.y = scrollY
            singleLetter[1].position.y = scrollY
        } else if (singleLetter[0].position.y <= - 2.98 && singleLetter[0].position.y > - 3.98) {
            singleLetter[0].position.y = scrollY
            singleLetter[1].position.y = scrollY
            singleLetter[3].position.y = scrollY
        } else if (singleLetter[0].position.y <= - 3.98 && singleLetter[0].position.y > - 4.98) {
            singleLetter[0].position.y = scrollY
            singleLetter[1].position.y = scrollY
            singleLetter[3].position.y = scrollY
            singleLetter[4].position.y = scrollY
        } else if (singleLetter[0].position.y <= - 4.98 && singleLetter[0].position.y > - 5.98) {
            singleLetter[0].position.y = scrollY
            singleLetter[1].position.y = scrollY
            singleLetter[3].position.y = scrollY
            singleLetter[4].position.y = scrollY
            singleLetter[5].position.y = scrollY
        }

    }, 10);

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick() 