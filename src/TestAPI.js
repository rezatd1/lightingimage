import React, { useEffect } from 'react';
import OpenAI from "openai";

export default function TestAPI() {
    useEffect(() => {
        // Define an async function inside the useEffect
        const fetchData = async () => {
            const openai = new OpenAI({
                apiKey: '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',
                dangerouslyAllowBrowser: true
            });
            
            try {
                const chatCompletion = await openai.chat.completions.create({
                    messages: [{ role: "user", content: "create test image" }],
                    model: "dall-e-2",
                });
                // Process the chatCompletion as needed
            } catch (error) {
                console.error("Failed to fetch data from OpenAI:", error);
            }
        };

        // Call the async function
        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>TestAPI</div>
    );
}
