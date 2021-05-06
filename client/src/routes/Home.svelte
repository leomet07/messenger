<script>
	export let messages = [];

	window.socket.on("inital_data",  (data) => {
		console.log("Intial Data: ", data)
		messages = data;
		
	});
	window.socket.on("new_message",  (data) => {
		console.log("new_message: ", data)
		messages = [...messages, data]
		
		console.log(messages)
	});

</script>
<h1>Home</h1>
<ul>
{#each messages as message}
	<li>{message.text}</li>
{/each}
</ul>