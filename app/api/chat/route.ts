import OpenAI from "openai";

import { OpenAIStream, StreamingTextResponse } from "ai";

import { DataAPIClient } from "@datastax/astra-db-ts";

const {
    ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
    OPENAI_API_KEY,
} = process.env;

if (
    !ASTRA_DB_NAMESPACE ||
    !ASTRA_DB_COLLECTION ||
    !ASTRA_DB_API_ENDPOINT ||
    !ASTRA_DB_APPLICATION_TOKEN ||
    !OPENAI_API_KEY
)
    throw new Error("Please set all required environment variables.");

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);

const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const latestMessage = messages[messages.length - 1]?.content;

        let docContext = "";

        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: latestMessage,
            encoding_format: "float",
        });

        try {
            if (!ASTRA_DB_COLLECTION) return "No collection";
            const collection = db.collection(ASTRA_DB_COLLECTION); //await
            const cursor = collection.find(
                {},
                {
                    sort: {
                        $vector: embedding.data[0].embedding,
                    },
                    limit: 10,
                },
            );

            const documents = await cursor.toArray();

            const docsMap = documents?.map((doc) => doc.text);
            docContext = JSON.stringify(docsMap);
            // const
        } catch (e) {
            console.log("Error querying db:", e);
        }

    const template = {
            role: "system",
            content: `
                    You are an AI assistant that knows everything about the Monad blockchain ecosystem, including its architecture, developer tools, testnet usage, and smart contract development.
                    
                    Use the context below to enhance your answers. The context will include recent content from Monad documentation, developer guides, GitHub repositories, dApp examples, or forum posts.
                    
                    If the context does not include the information needed, respond based on your own training data and best practices — but do not mention whether the context is missing or included.
                    
                    Format responses using markdown when appropriate. Do not return images or links unless they are explicitly part of the context.
                    
                    Keep answers concise, helpful, and technically accurate for developers working with Monad, especially those building dApps, using ERC-4337, or integrating wallet connections.
                    
                    ----------------
                    START CONTEXT
                    ${docContext}
                    END CONTEXT
                    ----------------
                    QUESTION: ${latestMessage}
                    ----------------
                    `,
        };


        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            stream: true,
            messages: [template, ...messages],
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (e) {
        throw e;
    }
}
