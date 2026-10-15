import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Loads the downloaded 17MB AntiqueCamera.glb model from Khronos glTF Sample Assets.
 * @param {Function} onProgressCallback - reports 0 to 100 progress
 * @returns {Promise<THREE.Group>}
 */
export function loadAntiqueCamera(onProgressCallback) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      '/models/AntiqueCamera.glb',
      (gltf) => {
        const model = gltf.scene;

        // Auto center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim;
        model.scale.setScalar(scale);

        // Center pivot
        const center = box.getCenter(new THREE.Vector3());
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale - 0.2;
        model.position.z = -center.z * scale;

        // Enhance materials
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material.isMeshStandardMaterial) {
              child.material.envMapIntensity = 1.2;
            }
          }
        });

        const wrapper = new THREE.Group();
        wrapper.name = 'antique_camera_wrapper';
        wrapper.add(model);
        wrapper.visible = false; // Hidden by default, toggled via UI
        resolve(wrapper);
      },
      (xhr) => {
        if (xhr.lengthComputable && onProgressCallback) {
          const percent = (xhr.loaded / xhr.total) * 100;
          onProgressCallback(percent);
        }
      },
      (error) => {
        console.warn('Could not load AntiqueCamera.glb:', error);
        reject(error);
      }
    );
  });
}
