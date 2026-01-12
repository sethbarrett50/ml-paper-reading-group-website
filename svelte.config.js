import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// GitHub Pages: generate fallback 404.html
			fallback: '404.html'
		}),
		// GitHub Pages project sites need a base path that matches repo name
		paths: {
			base: dev ? '' : process.env.BASE_PATH
		}
	}
};

export default config;
