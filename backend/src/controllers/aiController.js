import { aiChatSchema } from '../validators/index.js';

export const chat = async (req, res, next) => {
  try {
    const validated = aiChatSchema.parse(req.body);
    const userMsg = validated.message.toLowerCase();

    // Check if OPENAI_API_KEY is configured
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey.trim() !== '') {
      try {
        // Live OpenAI Chat API Call
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are NOVA Copilot, an AI productivity assistant for software engineering teams.' },
              { role: 'user', content: validated.message }
            ]
          })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
          return res.status(200).json({
            success: true,
            data: {
              reply: data.choices[0].message.content,
              isMock: false
            }
          });
        }
      } catch (apiErr) {
        console.warn('OpenAI API call failed, falling back to NOVA mock copilot engine:', apiErr);
      }
    }

    // Graceful fallback AI copilot response
    let reply = "NOVA Copilot initialized. I have analyzed your active workspace context.";

    if (userMsg.includes('summary') || userMsg.includes('project') || userMsg.includes('sprint')) {
      reply = "Your team currently has 3 active projects in Sprint #44: 'AI Copilot Engine v2.4' (82% complete), 'SOC-2 Compliance Security Audit' (100% complete), and 'Marketing Multi-Channel Launch' (In Planning). 1 task requires your review.";
    } else if (userMsg.includes('task') || userMsg.includes('todo') || userMsg.includes('assign')) {
      reply = "I found 1 high-priority task assigned to you: 'Generate Figma UI component specifications & API stubs'. Would you like me to generate TypeScript interface definitions for this component?";
    } else if (userMsg.includes('hello') || userMsg.includes('hi') || userMsg.includes('hey')) {
      reply = "Hello! I am NOVA Copilot. How can I assist your team with backlog triage, workflow automation, or sprint planning today?";
    } else {
      reply = `Based on your request "${validated.message}", I recommend setting up an automated workflow trigger that notifies the engineering team when PR code reviews are complete.`;
    }

    return res.status(200).json({
      success: true,
      data: {
        reply,
        isMock: true
      }
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};
