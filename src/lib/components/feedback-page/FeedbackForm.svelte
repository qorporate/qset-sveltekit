<script lang="ts">
	import { browser } from '$app/environment';
	import { showErrorToast, showSuccessToast } from '$lib/common/my-toasts';
	import type { Feedback } from '$lib/db/db';
	import emailjs from '@emailjs/browser';
	import { online } from 'svelte/reactivity/window';
	import { db } from '$lib/db/db';
	import { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from '$lib/common/constants';

	// State for tracking form submission
	let isSubmitting = $state(false);

	// @ts-ignore
	async function sendEmail(event) {
		if (!browser) {
			return;
		}

		event.preventDefault(); // Prevent the default form submission behavior

		// Prevent multiple submissions
		if (isSubmitting) return;

		// Set submitting state to true
		isSubmitting = true;

		const feedbackData = getFeedbackData();

		try {
			if (!online.current) {
				// Check if sync is supported before requesting sync
				if (!isBackgroundSyncSupported()) {
					console.error("The browser doesn't support background sync");
					showErrorToast("Sorry, you're offline. Please try again when connected.");
					return;
				}

				await saveFeedbackAndRequestSync(feedbackData);
			} else {
				await sendFeedbackAndRedirect(feedbackData);
			}
		} catch (error: any) {
			console.error('Oops! Something went wrong. Please try again.');
			console.error('error:', error);
			showErrorToast('Oops! Something went wrong. Please try again.');
			isSubmitting = false;
		}
	}

	function getFeedbackData(): Feedback {
		// Get form data
		// @ts-ignore
		const name = document.getElementById('name').value;
		// @ts-ignore
		const email = document.getElementById('email').value;
		// @ts-ignore
		const message = document.getElementById('message').value;
		// @ts-ignore
		const category = document.getElementById('category').value;

		return {
			id: crypto.randomUUID(),
			name: name ? name : 'anonymous',
			email: email ? email : 'anonymous@anon.com',
			message: `Category: ${category}.\n` + message,
			receiver: 'Henry Ihenacho',
			timestampInUtcString: new Date().toUTCString()
		};
	}

	function isBackgroundSyncSupported() {
		return (
			'serviceWorker' in navigator &&
			'SyncManager' in window &&
			'sync' in ServiceWorkerRegistration.prototype
		);
	}

	async function saveFeedbackAndRequestSync(feedbackData: Feedback) {
		// Store feedback in Dexie when offline
		await db.feedback.add(feedbackData);
		const sw = await navigator.serviceWorker.ready;

		navigator.serviceWorker.ready.then(function (swRegistration) {
			// @ts-ignore
			return swRegistration.sync.register('sync-feedback');
		});

		// @ts-ignore
		await sw.sync.register('sync-feedback');
		// @ts-ignore
		document.getElementById('feedback-form').reset();
		console.log('Background sync registered successfully');
		showSuccessToast(
			"Feedback saved! It will be sent when you're back online. Redirecting...",
			() => {
				window.location.href = '/';
				isSubmitting = false;
			},
			1500
		);
	}

	async function sendFeedbackAndRedirect(feedbackData: Feedback) {
		emailjs.init({
			publicKey: PUBLIC_KEY
		});

		await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
			name: feedbackData.name,
			email: feedbackData.email,
			message: feedbackData.message,
			receiver: feedbackData.receiver
		});

		// @ts-ignore
		document.getElementById('feedback-form').reset(); // Clear the form

		showSuccessToast(
			'Thank you for your feedback!. Redirecting...',
			() => {
				window.location.href = '/';
				isSubmitting = false;
			},
			1500
		);
	}
</script>

<div class="container">
	<form id="feedback-form" onsubmit={sendEmail}>
		<div class="feedback-header">
			<h1>Share Your Feedback</h1>
			<p>We're always looking to make QSet better for you.</p>
			<p>Your feedback matters!</p>
		</div>

		<label for="name">Name</label>
		<input type="text" id="name" name="name" placeholder="(Optional) What's your name?" />

		<label for="email">Email</label>
		<input
			type="email"
			id="email"
			name="email"
			placeholder="(Optional) Enter your email if you'd like us to reply."
		/>

		<label for="category">Feedback Category</label>
		<select id="category" name="category" required>
			<option value="" disabled selected> Select a category </option>
			<option value="feature-request">Feature Request</option>
			<option value="bug-report">Bug Report</option>
			<option value="general-suggestion"> General Suggestion </option>
			<option value="other">Other</option>
		</select>

		<label for="message">Your Feedback</label>
		<textarea
			id="message"
			name="message"
			placeholder="Share your thoughts, suggestions, or report issues..."
			required
		></textarea>

		<button type="submit" disabled={isSubmitting} class="submit-button">
			{#if isSubmitting}
				<div class="spinner"></div>
				<span>Sending...</span>
			{:else}
				Submit Feedback
			{/if}
		</button>
	</form>

	<div class="form-footer">Your feedback helps make QSet better for everyone. Thank you!</div>
</div>

<style>
	#feedback-form {
		max-width: 400px;
		margin: 0 auto;
		background: #fff;
		padding: 10px 10px 0px 10px;
		border-radius: 8px;
	}

	.feedback-header {
		text-align: center;
		margin-bottom: 0.9rem;
	}

	.feedback-header h1 {
		color: #333;
		font-size: 1.5rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.feedback-header p {
		color: #666;
		font-size: 1rem;
		margin: 0;
	}

	#feedback-form label {
		display: block;
		margin-bottom: 5px;
		font-weight: bold;
	}

	#feedback-form input,
	#feedback-form textarea,
	#feedback-form button {
		width: 100%;
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	#feedback-form button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #4caf50;
		color: white;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	#feedback-form button:hover {
		background-color: #45a049;
	}

	#feedback-form textarea {
		resize: vertical;
		min-height: 100px;
	}

	.form-footer {
		margin-top: 1rem;
		text-align: center;
		font-size: 0.8rem;
		color: #666;
	}

	#feedback-form select {
		width: 100%;
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background: white;
		font-size: 0.8rem;
	}

	.spinner {
		width: 18px;
		height: 18px;
		border: 3px solid transparent;
		border-top-color: white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-right: 8px;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 450px) {
		#feedback-form input,
		#feedback-form textarea,
		#feedback-form button {
			/* prevent accessibility zoom in on phones  */
			font-size: 16px;
		}
	}
</style>
