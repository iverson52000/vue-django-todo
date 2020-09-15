function sendReuqest(url, method, data) {
	let r = axios({
		method: method,
		url: url,
		data: data,
		xsrfCookieName: "csrftoken",
		xsrfHeaderName: "X-CSRFToken",
		headers: {
			"X-Requested-With": "XMLHttpRequest",
		},
	});
	return r;
}

var app = new Vue({
	el: "#app",
	delimiters: ["[[", "]]"],
	data: {
		task: "",
		tasks: [{ title: "one" }, { title: "two" }],
	},
	created() {
		let r = sendReuqest("", "get").then(
			(resp) => (this.tasks = resp.data.tasks)
		);
	},
	methods: {
		createTask() {
			let formData = new FormData();
			formData.append("title", this.task);
			sendReuqest("", "POST", formData).then((resp) => {
				this.tasks.push(resp.data.task);
				this.task = "";
			});
		},
		completeTask(id, index) {
			sendReuqest("" + id + "/complete/", "POST").then((resp) => {
				this.tasks.splice(index, 1);
				this.tasks.push(resp.data.task);
			});
		},
		deleteTask(id, index) {
			sendReuqest("" + id + "/delete/", "POST").then((resp) => {
				this.tasks.splice(index, 1);
			});
		},
	},
	computed: {
		taskList() {
			function compare(a, b) {
				if (a.completed > b.completed) return 1;
				if (a.completed < b.completed) return -1;
				return 0;
			}
			return this.tasks.sort(compare);
		},
	},
});
