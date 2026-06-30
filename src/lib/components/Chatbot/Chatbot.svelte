<script lang="ts">
	import { base } from '$app/paths';

	type Message = { role: 'user' | 'assistant'; content: string };

	let isOpen = false;
	let messages: Message[] = [];
	let inputText = '';
	let isLoading = false;
	let messagesEl: HTMLElement;

	async function sendMessage() {
		const text = inputText.trim();
		if (!text || isLoading) return;

		inputText = '';
		isLoading = true;

		messages = [...messages, { role: 'user', content: text }];
		messages = [...messages, { role: 'assistant', content: '' }];
		const assistantIdx = messages.length - 1;

		scrollToBottom();

		try {
			const res = await fetch(`${base}/api/chat`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: messages
						.slice(0, assistantIdx)
						.map((m) => ({ role: m.role, content: m.content }))
				})
			});

			if (!res.ok || !res.body) throw new Error('Bad response');

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const parts = buffer.split('\n\n');
				buffer = parts.pop() ?? '';

				for (const part of parts) {
					const line = part.trim();
					if (!line.startsWith('data: ')) continue;
					const data = line.slice(6);
					if (data === '[DONE]') break;
					try {
						const parsed = JSON.parse(data) as { text: string };
						messages = messages.map((m, i) =>
							i === assistantIdx ? { ...m, content: m.content + parsed.text } : m
						);
						scrollToBottom();
					} catch {
						// ignore malformed SSE chunks
					}
				}
			}
		} catch {
			messages = messages.map((m, i) =>
				i === assistantIdx
					? { ...m, content: 'Something went wrong. Please try again.' }
					: m
			);
		} finally {
			isLoading = false;
		}
	}

	function scrollToBottom() {
		setTimeout(() => {
			messagesEl?.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
		}, 30);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}
</script>

<div class="chatbot">
	<button class="chatbot__toggle" on:click={() => (isOpen = !isOpen)} aria-label="Toggle chat">
		{#if isOpen}
			<span>✕</span>
		{:else}
			<span>💬</span>
		{/if}
	</button>

	{#if isOpen}
		<div class="chatbot__panel">
			<div class="chatbot__header">
				<span>Ask about Terence</span>
				<button class="chatbot__close" on:click={() => (isOpen = false)} aria-label="Close chat">
					✕
				</button>
			</div>

			<div class="chatbot__messages" bind:this={messagesEl}>
				{#if messages.length === 0}
					<div class="chatbot__welcome">
						<p>👋 Hi! I'm Terence's portfolio assistant.</p>
						<p>Ask me about his experience, education, or skills!</p>
					</div>
				{/if}

				{#each messages as msg, i}
					<div class={`chatbot__msg chatbot__msg--${msg.role}`}>
						{#if msg.content}
							{msg.content}
						{:else if isLoading && i === messages.length - 1}
							<span class="chatbot__typing">
								<span /><span /><span />
							</span>
						{/if}
					</div>
				{/each}
			</div>

			<div class="chatbot__input-area">
				<textarea
					placeholder="Ask me about Terence..."
					bind:value={inputText}
					on:keydown={handleKeydown}
					rows={1}
					disabled={isLoading}
				/>
				<button
					class="chatbot__send"
					on:click={sendMessage}
					disabled={isLoading || !inputText.trim()}
					aria-label="Send message"
				>
					➤
				</button>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.chatbot {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 12px;

		&__toggle {
			width: 52px;
			height: 52px;
			border-radius: 50%;
			border: 1px solid var(--border);
			background: var(--secondary);
			color: var(--main-text);
			font-size: 22px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);

			&:hover {
				background: var(--secondary-hover);
			}
		}

		&__panel {
			width: 340px;
			display: flex;
			flex-direction: column;
			border: 1px solid var(--border);
			border-radius: 12px;
			background: var(--secondary);
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
			overflow: hidden;
		}

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12px 16px;
			border-bottom: 1px solid var(--border);
			background: var(--tertiary);
			font-weight: 600;
			font-size: 14px;
			color: var(--main-text);
		}

		&__close {
			background: none;
			border: none;
			cursor: pointer;
			color: var(--secondary-text);
			font-size: 16px;
			padding: 0;
			line-height: 1;

			&:hover {
				color: var(--main-text);
			}
		}

		&__messages {
			overflow-y: auto;
			padding: 12px;
			display: flex;
			flex-direction: column;
			gap: 8px;
			min-height: 220px;
			max-height: 340px;
		}

		&__welcome {
			display: flex;
			flex-direction: column;
			gap: 4px;
			padding: 8px;
			color: var(--tertiary-text);
			font-size: 13px;
			text-align: center;

			p {
				margin: 0;
			}
		}

		&__msg {
			max-width: 85%;
			padding: 8px 12px;
			border-radius: 12px;
			font-size: 13px;
			line-height: 1.5;
			word-wrap: break-word;
			white-space: pre-wrap;

			&--user {
				align-self: flex-end;
				background: var(--accent);
				color: var(--main-text);
				border-bottom-right-radius: 3px;
			}

			&--assistant {
				align-self: flex-start;
				background: var(--tertiary);
				color: var(--main-text);
				border-bottom-left-radius: 3px;
			}
		}

		&__typing {
			display: flex;
			gap: 4px;
			align-items: center;
			height: 20px;

			span {
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background: var(--secondary-text);
				animation: chatbot-bounce 1.2s infinite;

				&:nth-child(2) {
					animation-delay: 0.2s;
				}
				&:nth-child(3) {
					animation-delay: 0.4s;
				}
			}
		}

		&__input-area {
			display: flex;
			align-items: flex-end;
			gap: 8px;
			padding: 10px 12px;
			border-top: 1px solid var(--border);

			textarea {
				flex: 1;
				resize: none;
				border: 1px solid var(--border);
				border-radius: 8px;
				padding: 8px 10px;
				background: var(--main);
				color: var(--main-text);
				font-family: inherit;
				font-size: 13px;
				line-height: 1.4;
				min-height: 36px;
				max-height: 100px;
				overflow-y: auto;

				&:focus {
					outline: none;
					border-color: var(--border-hover);
				}

				&::placeholder {
					color: var(--accent-text);
				}

				&:disabled {
					opacity: 0.6;
				}
			}
		}

		&__send {
			width: 36px;
			height: 36px;
			border-radius: 8px;
			border: 1px solid var(--border);
			background: var(--tertiary);
			color: var(--main-text);
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 16px;
			flex-shrink: 0;

			&:hover:not(:disabled) {
				background: var(--tertiary-hover);
			}

			&:disabled {
				opacity: 0.4;
				cursor: not-allowed;
			}
		}
	}

	@keyframes chatbot-bounce {
		0%,
		60%,
		100% {
			transform: translateY(0);
		}
		30% {
			transform: translateY(-5px);
		}
	}
</style>
