import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '$env/static/private';
import { RESUME_CONTEXT } from '$lib/data/resumeContext';
import type { RequestHandler } from './$types';

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Terence Lin's personal portfolio assistant. Your SOLE PURPOSE is to answer questions about Terence Lin — his education, work experience, projects, skills, and personal background.

STRICT RULES:
1. ONLY answer questions that are directly about Terence Lin personally (his work history, education, skills, projects, interests, background, or contact info).
2. If someone asks about ANYTHING else — general programming help, world events, other people, opinions on unrelated topics, creative writing, math problems, etc. — respond with EXACTLY this message: "I can only answer questions about Terence Lin's background and portfolio. Feel free to ask me about his education, experience, projects, or skills!"
3. Do NOT provide general technical tutorials or coding help, even if it relates to a technology Terence knows.
4. Do NOT answer hypothetical questions unrelated to Terence.
5. Be friendly, concise, and informative when answering questions about Terence.

Here is Terence Lin's complete resume and portfolio information:

${RESUME_CONTEXT}`;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { messages } = await request.json();

		const encoder = new TextEncoder();

		const stream = new ReadableStream({
			async start(controller) {
				try {
					const response = client.messages.stream({
						model: 'claude-opus-4-8',
						max_tokens: 1024,
						thinking: { type: 'adaptive' },
						system: SYSTEM_PROMPT,
						messages
					});

					for await (const chunk of response) {
						if (
							chunk.type === 'content_block_delta' &&
							chunk.delta.type === 'text_delta'
						) {
							const data = JSON.stringify({ text: chunk.delta.text });
							controller.enqueue(encoder.encode(`data: ${data}\n\n`));
						}
					}

					controller.enqueue(encoder.encode('data: [DONE]\n\n'));
				} finally {
					controller.close();
				}
			}
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive'
			}
		});
	} catch {
		return new Response(JSON.stringify({ error: 'Failed to process request' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
