"use client";
import Image from "next/image";
import f1GPTLogo from "./assets/logo.png";
import { useChat } from "ai/react";
import { Message } from "ai";
import "./global.css";
import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionsRow from "./components/PromptSuggestionsRow";
import { useEffect, useRef } from "react";

const Home = () => {
    const {
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        messages,
        append,
    } = useChat();

    const noMessages = !messages || messages.length === 0;

    const handlePrompt = (promptText: string) => {
        const msg: Message = {
            id: crypto.randomUUID(),
            content: promptText,
            role: "user",
        };
        append(msg);
    };

    // Auto-scroll to latest message
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <main>
            <Image src={f1GPTLogo} width={250} alt="MonadGPT Logo" />
            <section className={noMessages ? "" : "populated"} style={{ position: "relative" }}>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            MonadGPT is a RAG (retrieval-augmented generation) chatbot that can answer questions based
                            on the PDFs you upload. We hope you enjoy using it!
                        </p>
                        <br />
                        <PromptSuggestionsRow onPromptClick={handlePrompt} />
                    </>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <Bubble key={`message-${index}`} message={message} />
                        ))}
                        {isLoading && <LoadingBubble />}
                        <div ref={messagesEndRef} />
                    </>
                )}

                {/* Scroll to top button */}
                {messages.length > 3 && (
                    <button
                        style={{
                            position: "absolute",
                            bottom: "80px",
                            right: "30px",
                            background: "#411b8d",
                            color: "#fff",
                            padding: "10px 14px",
                            borderRadius: "10px",
                            border: "none",
                            cursor: "pointer",
                            zIndex: 1000,
                        }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        ↑ Top
                    </button>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        className="question-box"
                        onChange={handleInputChange}
                        value={input}
                        placeholder="Ask me something..."
                    />
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Home;
