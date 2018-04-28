window.onload = function() {
	fetch("/status").then(function(res) {
		res.json().then(function(data) {
			console.log(data);
			document.getElementById("d-name").innerHTML = data.name;
			document.getElementById("d-comment").innerHTML = data.comment;
		});
	});
	
	
} 
