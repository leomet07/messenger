<script>
	import { messages } from '../stores';
	(async function () {
		console.log("On home")
		const retrieved_messages = (await(await fetch("http://127.0.0.1:6969/api/db/get_messages")).json()).messages;
		$messages = retrieved_messages;
	
		
		window.socket.on("new_message",  (data) => {
			console.log("new_message: ", data)
			
			$messages = [...$messages, data];
			
			console.log(messages)
		});
  	
	}());
</script>
<h1>Home</h1>
<ul>
{#each $messages as message}
	<li>{message.text}</li>
{/each}
</ul>