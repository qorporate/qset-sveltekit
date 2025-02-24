import { browser } from '$app/environment';
import posthog from 'posthog-js';

export const load = async () => {
	if (browser) {
		posthog.init('phc_LhQCeUx9IuQYYxJ5W8wtTI4BzUVHNuDlq9V2DKlrSRZ', {
			api_host: 'https://us.i.posthog.com',
			capture_pageview: false,
			capture_pageleave: false
		});
	}
	return;
};

export const prerender = true;
