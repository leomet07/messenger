import Home from "./routes/Home.svelte";
import About from "./routes/About.svelte";
const routes = [
	{
		name: "/",
		component: Home,
	},
	{
		name: "/about",
		component: About,
	},
];

export { routes };
