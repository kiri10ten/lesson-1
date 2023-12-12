import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



// scene and camera 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 400 );
camera.position.z = 100
camera.position.y=5


//geomentry and material 
const spheregeometry = new THREE.SphereGeometry(1,32,32)
const sunmaterial = new THREE.MeshBasicMaterial(
	{
		color:'yellow'
	}
)




//mesh
const sun = new THREE.Mesh(
	spheregeometry,
	sunmaterial

)

//scale the mesh
sun.scale.setScalar(5)


//earthmaterial 

const earthmaterial = new THREE.MeshBasicMaterial(
	
	{
		color:'blue'
	}
)

const moonmaterial = new THREE.MeshBasicMaterial(
	{
		color:'grey'
	}
)

const moon = new THREE.Mesh(
	spheregeometry,
	moonmaterial
)
moon.scale.setScalar(0.4)
moon.position.x= 2

const earth = new THREE.Mesh(spheregeometry, earthmaterial)
earth.position.x = 10
scene.add(earth)
scene.add(sun)
earth.add(moon)

// canvas and renderer

const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




//add controls 
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.maxDistance = 200;
controls.minDistance =20




//get the clock 

const clock =new THREE.Clock()





//render loop 


const renderloop = () => {

	//addanimation
	const elapsedtime = clock.getElapsedTime()
	
	earth.rotation.y+=0.01
	earth.position.x = Math.sin(elapsedtime) * 10
	earth.position.z= Math.cos(elapsedtime) * 10
     

    moon.position.x = Math.sin(elapsedtime) * 2
	moon.position.z= Math.cos(elapsedtime) * 2
     
	controls.update();
	renderer.render(scene, camera)
	window.requestAnimationFrame(renderloop)
}

renderloop()