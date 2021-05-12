<script>
	import { messages } from '../stores';
	
	let input_message;
	let room = null;
	let room_form;

	(async function () {
		console.log("On home")
		
	
		
		window.socket.on("new_message",  (data) => {
			console.log("new_message: ", data)
			
			$messages = [...$messages, data];
			
			console.log(messages)

			scroll_to_bottom()

		
		});
		window.socket.on("all_messages",  (all_messages) => {
			console.log("all_messages")
			$messages = all_messages;
			

		});
  	
	}());

	async function create_message(e){
		e.preventDefault()
		console.log("Clicked")
		window.socket.emit("create_message", {text : input_message})
		input_message = "";
	}
	async function join_room(e){
		e.preventDefault()
		console.log("Join room: ", room_form)
		
		window.socket.emit("room", room_form);
		const recieved_messages =  await get_messages_http(room_form)
		console.log(recieved_messages)
		$messages =recieved_messages;
		room = room_form;
	}
	function scroll_to_bottom(){
		let element = document.getElementById("messages");
    	element.scrollTop = element.scrollHeight ;		
	}

	async function get_messages_http(room){
		const response = await fetch(window.BASE_URL + "/api/db/get_messages", {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		},
		"body": JSON.stringify({room})
		});

		let json = await response.json();

		return json.messages;
	
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
	{#if room}
		<form on:submit={create_message} >
			<input id = "message_draft_box" bind:value={input_message} />
			<input type="submit" id = "submit_button" value="Send"/>
				
			
		</form>
	{:else}
		<form on:submit={join_room} >
			<input id = "message_draft_box" bind:value={room_form} />
			<input type="submit" id = "submit_button" value="Join"/>
				
			
		</form>
	{/if}
	
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

#message_draft_box{
	width: 85vw;
	margin-bottom: 0;
	border : 1px solid black;
}

#submit_button{
	border : 1px solid black;
}

</style>
