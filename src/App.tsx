import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SoftShadows } from "@react-three/drei";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

function App() {
	return (
		<div className="flex h-lvh w-lvw">
			<Canvas shadows camera={{ position: [0, 30, 0], fov: 30, far: 10000 }}>
				<color attach={"background"} args={["#242424"]} />
				<SoftShadows size={42} />
				<Suspense>
					<Physics debug>
						<Experience />
					</Physics>
				</Suspense>
			</Canvas>
		</div>
	);
}

export default App;
