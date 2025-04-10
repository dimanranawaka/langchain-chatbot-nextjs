"use client";

import Image from "next/image";
import f1GPTLogo from "./assets/logo.png";
import { useChat } from "ai/react";
import { Message } from "ai";
import "./global.css"
import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionsRow from "./components/PromptSuggestionsRow";


const Home = () => {
    const {
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        messages,
        append,
    } = useChat();

    const noMessages = !messages|| messages.length === 0;

    const handlePrompt = (promptText) => {
        const msg : Message = {
            id:crypto.randomUUID(),
            content:promptText,
            role:"user",
        }
        append(msg);
    }

    return (
        <main>
            <Image src={f1GPTLogo} width={250} alt="MonadGPT Logo" />
            <section className={noMessages ? "" : "populated"}>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            MonadGPT is a RAG (retrieval-augmented generation) chatbot that can answer questions based
                            on the PDFs you upload. We hope you enjoy using it!
                        </p>
                        <br />
                        <PromptSuggestionsRow onPromptClick={handlePrompt}/>
                    </>
                ) : (
                    <>
                        {/*map messages onto text bubbles*/}
                        {messages.map((message,index) => <Bubble key={`message-${index}`} message={message}/>)}
                        {isLoading && <LoadingBubble/>}
                    </>
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
