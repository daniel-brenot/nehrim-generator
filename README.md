# Automatic ElvenAI vouce line creator

This tool will read the progress of the mod and generate voices for characters
automatically by calling the ElvenAI API to generate new voices, as well as
generate the voice lines for said voices.

# Prerequisites

You need to have nodejs installed. You should install the LTS version, not latest since the latest is usually unstable.

https://nodejs.org/en/download

# Configuration

Set the environment variable `OPENAI_API_KEY` to your api key from elven labs.
The program wll pick this up and automatically use it.

You also must have `ELVENAI_VOICE_NAME` set to the name of the voice you would like
the tool to use

# Running



Then run `npm install` to install the dependencies for the project.

Lastly, you can run `npm run-script start` to run the code. Enjoy!

