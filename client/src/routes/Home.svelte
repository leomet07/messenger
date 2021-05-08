<script>
	import { messages } from '../stores';
	
	let input_message;

	(async function () {
		console.log("On home")
		const retrieved_messages = (await(await fetch(window.BASE_URL + "/api/db/get_messages")).json()).messages;
		$messages = retrieved_messages;
	
		
		window.socket.on("new_message",  (data) => {
			console.log("new_message: ", data)
			
			$messages = [...$messages, data];
			
			console.log(messages)

			scroll_to_bottom()

		
		});
  	
	}());

	async function create_message(e){
		e.preventDefault()
		console.log("Clicked")
		window.socket.emit("create_message", {text : input_message})
		input_message = "";
	}
	function scroll_to_bottom(){
		let element = document.getElementById("messages");
    	element.scrollTop = element.scrollHeight ;
		

		
	}
	

</script>

<main id ="main">
	<h1 id="quirky">Home</h1>
	<div id = "messages" >
	{#each $messages as message}
		<p>{message.text}</p>
		
	{/each}
	
	</div>
	<form on:submit={create_message} >
		<input bind:value={input_message} />
		<input type= "submit" text="Send"/>
			
		
	</form>
</main>


<style>
#messages{
	height : 75vh;
	overflow: scroll;
	padding-bottom: 66px;
}
</style>
