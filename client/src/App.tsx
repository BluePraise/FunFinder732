
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import SubmitEvent from "@/pages/SubmitEvent";
import FamilyFitness from "@/pages/FamilyFitness";
import Pools from "@/pages/Pools";

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col bg-[var(--ff-cream)]">
				<Navigation />
				<main className="flex-1 p-6">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/submit" element={<SubmitEvent />} />
						<Route
							path="/family-fitness"
							element={<FamilyFitness />}
						/>
						<Route path="/pools" element={<Pools />} />
					</Routes>
				</main>
				<Footer />
			</div>
			<Analytics />
		</BrowserRouter>
	);
}

export default App;
