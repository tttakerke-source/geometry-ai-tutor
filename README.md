# Geometry AI Tutor

An interactive geometry learning website that demonstrates AI-powered differentiated instruction.

## Features

- Five geometry topic options
- Three difficulty levels: Foundation, Standard, and Advanced
- Generate a new problem using an AI model
- Ask for a hint or a step-by-step solution
- Check a student's numeric answer and track practice attempts
- Responsive layout for desktop and mobile
- Built-in sample mode works without an API key
- Serverless Netlify function keeps the OpenAI API key out of browser code

## Tech stack

- HTML, CSS, and vanilla JavaScript
- Netlify Functions (Node.js)
- OpenAI Chat Completions API (default model: `gpt-4o-mini`)

## Run locally in sample mode

Opening `index.html` directly will display the built-in sample problems. AI requests will fall back to sample mode unless the Netlify function is running and configured.

For local serverless testing:
1. Install Node.js and the Netlify CLI.
2. In this project folder, run `npm install -g netlify-cli`.
3. Set an environment variable named `OPENAI_API_KEY` in your terminal. Do not commit the key to GitHub.
4. Run `netlify dev`.
5. Open the local URL shown by Netlify.

## Deploy to Netlify

1. Create a GitHub repository and upload all files in this project.
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository.
3. The `netlify.toml` file configures the publish folder and functions folder.
4. In **Site configuration → Environment variables**, add:
   - `OPENAI_API_KEY` = your secret API key
   - Optional: `OPENAI_MODEL` = `gpt-4o-mini`
5. Deploy the site. Test each topic, level, hint, and solution after deployment.

Never put your API key in `script.js`, `index.html`, or any public repository. API usage may incur charges. If you do not configure the key, the website still works in sample mode.

## Differentiation design

- **Foundation:** simpler numbers, clear steps, direct hints, and familiar contexts.
- **Standard:** curriculum-level tasks requiring students to choose and apply formulas.
- **Advanced:** multi-step applications or reasoning that connect multiple geometry ideas.

The AI prompt changes the scaffold and complexity according to the selected level. The sample problems provide a fallback so the user interface can be tested even when the AI service is unavailable.

## Mathematical verification

AI-generated mathematical content should be checked before classroom use. This prototype includes hand-checked sample problems, but AI-generated responses can still contain mistakes. Verify calculations and units when testing.
