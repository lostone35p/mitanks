import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

export function PolyCity() {
	const map = useGLTF("models/polycity.glb");
	useEffect(() => {
		map.scene.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	});

	return (
		<RigidBody colliders="trimesh" type="fixed">
			<primitive object={map.scene} />{" "}
		</RigidBody>
	);
}

useGLTF.preload("models/polycity.glb");
