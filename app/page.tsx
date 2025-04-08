"use client";

import Image from "next/image";
import f1GPTLogo from "./assets/logo.png";
import { useChat } from "ai/react";
import "./global.css"

const Home = () => {
    const {
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        messages,
        append,
    } = useChat();

    const noMessages = messages.length === 0;

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
                        {/*<PromptSugesstionRow/>*/}
                    </>
                ) : (
                    <>
                        {/*map messages onto text bubbles*/}
                        {/*<LoadingBubble/>*/}
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
