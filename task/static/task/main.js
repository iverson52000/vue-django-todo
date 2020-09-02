var app = new Vue({
	el: '#app',
	delimiters: ["[[", "]]"],
	data: {
		task: '',
		tasks: [
			{ title: 'one' },
			{ title: 'two' },
		]
	},
});