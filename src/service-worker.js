/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Imports:
import { build, files, version, prerendered } from '$service-worker';
import emailjs from '@emailjs/browser';
import { db } from './lib/db/db';
import { SERVICE_ID, PUBLIC_KEY, TEMPLATE_ID } from './lib/common/constants';

// Initializations:
const worker = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files, // everything in `static`
	...prerendered
];

worker.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

worker.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

worker.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			return cache.match(url.pathname);
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch {
			return cache.match(event.request);
		}
	}

	event.respondWith(respond());
});

worker.addEventListener('message', (event) => {
	console.debug('Received message', event.type);
	if (event.data && event.type === 'SKIP_WAIT') {
		worker.skipWaiting();
	}
});

//#region SYNC FEEDBACK

worker.addEventListener('sync', (event) => {
	console.debug('Sync event triggered:', event.tag);
	if (event.tag === 'sync-feedback') {
		event.waitUntil(syncFeedback());
	}
});

async function syncFeedback() {
	console.debug('received sync event. Sending saved feedback.');
	try {
		const feedbacks = await db.feedback.toArray();
		console.debug(`Fetched ${feedbacks.length} feedback items.`);
		for (const feedback of feedbacks) {
			try {
				emailjs.init({
					publicKey: PUBLIC_KEY
				});

				await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
					name: feedback.name,
					email: feedback.email,
					message: feedback.message,
					receiver: feedback.receiver
				});

				// Remove successfully sent feedback
				await db.feedback.delete(feedback.id);
				console.debug(`Sent feedback. id: ${feedback.id}`);
			} catch (error) {
				console.error('Error sending feedback:', error);
				// Leave failed feedback in the store to try again later
			}
		}
	} catch (error) {
		console.error('Sync error:', error);
	}
}

//#endregion
