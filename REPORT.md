# Brief Project Report: Geometry AI Tutor

## Project purpose
Geometry AI Tutor is a web-based application designed to demonstrate AI-supported differentiated learning in geometry. Students select a topic and one of three difficulty levels—Foundation, Standard, or Advanced. The application provides a geometry task, a hint, a step-by-step solution, and a short conceptual explanation. Students can also enter an answer and track their practice results.

## AI integration
The application uses an OpenAI model through a Netlify serverless function. The API key is stored as a server-side environment variable and is not exposed in the browser. The user interface sends the selected topic, difficulty level, and requested action to the serverless function. If the AI service is not configured or unavailable, built-in sample activities keep the website usable.

## Prompt design
The system prompt identifies the model as a careful geometry teacher, requires mathematically checked content, consistent units, valid JSON, and level-specific teaching guidance. The level instructions are:
- **Foundation:** “Use simple numbers and familiar contexts. Give one small step at a time, define terms, and provide a direct but learning-focused hint.”
- **Standard:** “Use a grade-level geometry problem. Expect the learner to choose and apply the relevant formula with a few steps.”
- **Advanced:** “Use a multi-step challenge, proof-style reasoning, or a realistic application. Require students to connect at least two ideas.”

For problem generation, the model is asked to return a title, problem, answer, hint, solution steps, explanation, and numeric answer where possible. Separate prompts request a hint without revealing the final answer or a step-by-step solution for the current problem.

## How differentiation is achieved
Differentiation is achieved by changing the complexity of the task and the amount of support. Foundation tasks use accessible values and direct scaffolding. Standard tasks align with typical school-level problem solving. Advanced tasks require multiple steps, applications, or connections between concepts. The same topic can therefore support students with different levels of readiness.

## Testing and limitations
The website includes five geometry topics, responsive layout, answer checking for numeric answers, and progress counters. Built-in examples support testing without an API key. AI-generated math can be incorrect, so generated solutions must be verified before educational use. The application is a prototype and does not store student progress permanently.

## Conclusion
Geometry AI Tutor demonstrates how an AI model can help personalize geometry practice by adapting tasks and guidance to learner readiness. It supports student independence while making hints and explanations available when needed.
