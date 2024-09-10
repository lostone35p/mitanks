/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { PolyCity } from "./PolyCity";
import { useEffect, useRef, useState } from "react";
import { DirectionalLightHelper } from "three";
import {
	insertCoin,
	Joystick,
	myPlayer,
	onPlayerJoin,
	PlayerState,
} from "playroomkit";
import { CharacterLogic } from "./CharacterLogic";

interface Player {
	state: PlayerState;
	joystick: Joystick;
}

export function Experience() {
	const [players, setPlayers] = useState<Player[]>([]);

	const start = async () => {
		await insertCoin();
	};

	useEffect(() => {
		start();

		onPlayerJoin((state) => {
			const joystick = new Joystick(state, {
				type: "angular",
				buttons: [{ id: "fire", label: "Fire" }],
			});
			const newPlayer = { state, joystick };
			state.setState("health", 1);
			state.setState("deaths", 0);
			state.setState("kills", 0);
			setPlayers((players) => [...players, newPlayer]);
			state.onQuit(() => {
				setPlayers((players) => players.filter((p) => p.state.id !== state.id));
			});
		});
	}, []);

	const light = useRef<any>();
	useHelper(light, DirectionalLightHelper, 1, "red");
	return (
		<group>
			<directionalLight
				ref={light}
				position={[-250, 50, -25]}
				intensity={0.8}
				castShadow
				shadow-camera-near={0}
				shadow-camera-far={80}
				shadow-camera-left={-30}
				shadow-camera-right={30}
				shadow-camera-top={20}
				shadow-camera-bottom={-25}
				shadow-mapSize-width={4096}
				shadow-mapSize-height={4096}
				shadow-bias={-0.0001}
			/>
			<OrbitControls />
			<group scale={0.1}>
				<PolyCity />
			</group>

			{players.map(({ state, joystick }, index) => {
				return (
					<CharacterLogic
						position-x={-80}
						position-y={2}
						position-z={60}
						pos
						key={state.id}
						state={state}
						joystick={joystick}
						userPlayer={state.id === myPlayer()?.id}
					/>
				);
			})}
			<Environment preset="sunset" />
		</group>
	);
}
