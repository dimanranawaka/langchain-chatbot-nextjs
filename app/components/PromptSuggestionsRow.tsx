const PromptSuggestionsRow = ({
                                  onPromptClick,
                              }: {
    onPromptClick: (prompt: string) => void;
}) => {
    const prompts = [
        "What is Monad and how is it different from Ethereum?",
        "How does Monad achieve 10,000 transactions per second?",
        "What is optimistic parallel execution in Monad?",
        "What makes Monad EVM-compatible?",
    ];

    return (
        <div className="prompt-suggestion-row">
            {prompts.map((prompt, index) => (
                <button
                    key={index}
                    className="prompt-suggestion-button"
                    onClick={() => onPromptClick(prompt)}
                >
                    {prompt}
                </button>
            ))}
        </div>
    );
};

export default PromptSuggestionsRow;
