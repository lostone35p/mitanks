import { useRef } from "react";
import { CharacterTank } from "./CharacterTank";
import {
	CapsuleCollider,
	CuboidCollider,
	RigidBody,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

const MOVEMENT_SPEED = 100000;

export function CharacterLogic({ state, joystick, userPlayer, ...props }) {
	const group = useRef(null);
	const character = useRef(null);
	const rigidbody = useRef(null);

	useFrame((_, delta) => {
		const angle = joystick.angle();
		if (joystick.isJoystickPressed() && angle) {
			if (character.current === null) return;

			character.current.rotation.y = angle;

			const impulse = {
				x: Math.sin(angle) * MOVEMENT_SPEED * delta,
				y: 0,
				z: Math.cos(angle) * MOVEMENT_SPEED * delta,
			};

			rigidbody.current.applyImpulse(impulse, true);
		}
	});

	return (
		<group ref={group} {...props}>
			<RigidBody
				ref={rigidbody}
				colliders={false}
				linearDamping={12}
				lockRotations>
				<group ref={character}>
					<CharacterTank />
				</group>
				<CuboidCollider args={[3.8, 2.5, 5]} position={[0, 1.7, 0]} />
			</RigidBody>
		</group>
	);
}
