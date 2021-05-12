<!-- App.svelte -->
<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	
	import { io } from "socket.io-client";

	window.BASE_URL = "https://discordmessengerbackend.herokuapp.com"
	if (window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1" ){
		console.log("In development mode");
		window.BASE_URL = "http://localhost:6969"

	}
	let socket = io(window.BASE_URL);
	
	window.socket = socket;
	
	window.socket.on("connect", function (data) {
		console.log("connected to server");
		
	});
	
  
	export let url = "";
</script>
  
<Router url="{url}">
	<nav id = "navbar">
		<Link to="/">Home</Link>
		| 
		<Link to="about">About</Link>
		
	</nav>
	
	<main>
		<Route path="about"><About/> </Route>
		<Route path="/"><Home /></Route>
	</main>
	
</Router>

<style>
	nav{
		text-align: center;
	}
	main {
		width : 100%;
		/* border : 1px solid red; */
		text-align : center;
	}

</style>