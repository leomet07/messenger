<!-- App.svelte -->
<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	
	import { io } from "socket.io-client";
	let socket = io('http://localhost:6969');
	window.socket = socket;
	
	window.socket.on("connect", function (data) {
		console.log("connected to server");
	});
	
  
	export let url = "";
</script>
  
  <Router url="{url}">
	<nav>
	  <Link to="/">Home</Link>
	  <Link to="about">About</Link>
	  
	</nav>
	<div>
	  
	  <Route path="about"><About/> </Route>
	  <Route path="/"><Home /></Route>
	</div>
  </Router>