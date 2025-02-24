<script lang="js">
	import { browser } from '$app/environment';
	import { showErrorToast, showSuccessToast } from '$lib/common/my-toasts';
	import emailjs from '@emailjs/browser';

	// @ts-ignore
	function sendEmail(event) {
		if (!browser) {
			return;
		}

		event.preventDefault(); // Prevent the default form submission behavior

		// Get form data
		// @ts-ignore
		const name = document.getElementById('name').value;
		// @ts-ignore
		const email = document.getElementById('email').value;
		// @ts-ignore
		const message = document.getElementById('message').value;
		// @ts-ignore
		const category = document.getElementById('category').value;

		emailjs.init({
			publicKey: 'N9kf-ZYRoWAiH2kWq'
		});

		// Send the email using EmailJS
		emailjs
			.send('service_365k1gl', 'template_j4i3xba', {
				name: name ? name : 'anonymous',
				email: email ? email : 'anonymous@anon.com',
				message: `Category: ${category}.\n` + message,
				receiver: 'Henry Ihenacho'
			})
			.then(
				function () {
					showSuccessToast('Thank you for your feedback!.');
					// @ts-ignore
					document.getElementById('feedback-form').reset(); // Clear the form
					window.location.href = '/'; // Redirect to the home page
				},
				function (error) {
					console.error('Oops! Something went wrong. Please try again.' + error.text);
					console.error('error:', error);
					showErrorToast('Oops! Something went wrong. Please try again.');
				}
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

		<button type="submit">Submit Feedback</button>
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
	@media (max-width: 450px) {
		#feedback-form input,
		#feedback-form textarea,
		#feedback-form button {
			/* prevent accessibility zoom in on phones  */
			font-size: 16px;
		}
	}
</style>
