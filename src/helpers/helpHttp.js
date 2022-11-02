export const helpHttp = () => {
	const customFetch = (endpoint, options) => {
		const defaultHeader = {
			accept: 'application/json',
		};

		// const controller = new AbortController();
		// options.signal = controller.signal;

		options.method = options.method || 'GET';
		options.headers = options.headers
			? { ...defaultHeader, ...options.headers }
			: defaultHeader;

		options.body = JSON.stringify(options.body) || false;
		if (!options.boyd) delete options.body;

		// console.log(options);
		// setTimeout(() => controller.abort(), 2500);

		return fetch(endpoint, options).then((res) =>
			res.ok ? res.json() : Promise.reject(new Error('Ocurrió un error'))
		);
	};

	const get = (url, options = {}) => customFetch(url, options);

	const post = (url, options = {}) => {
		options.method = 'POST';
		return customFetch(url, options);
	};

	const put = (url, options = {}) => {
		options.method = 'PUT';
		return customFetch(url, options);
	};

	const del = (url, options = {}) => {
		options.method = 'DELETE';
		return customFetch(url, options);
	};

	return {
		get,
		post,
		put,
		del,
	};
};
