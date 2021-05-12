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
		window.socket.on("deleted_message",  (deleted_message_id) => {
			console.log("deleted message, id: ", deleted_message_id)
			$messages = $messages.filter(message => message._id != deleted_message_id)

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
	<h1 id="title">Home</h1>
	<div id = "messages" >
	<ul>
		{#each $messages as message}
			<li class="message">{message.text}</li>
		{/each}
	</ul>
	
	</div>
	<form on:submit={create_message} >
		<input bind:value={input_message} />
		<input type= "submit" text="Send"/>
			
		
	</form>
</main>


<style>
#title{
	display: none;
}
#messages{
	height : 75vh;
	overflow: scroll;
	padding-bottom: 66px;
	text-align: left;
	padding-left: 15px  ;
	-ms-overflow-style: none;  /* IE and Edge */
  	scrollbar-width: none;  /* Firefox */
}

#messages::-webkit-scrollbar {
  display: none; /* Chrome (based) */
}

@media only screen and (min-height: 880px) {
	
	#title{
		display: block;
	}
}

.message{
	margin-bottom: 0;
	margin-top: 0;
}


</style>
