import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionsRow = ({onPromptClick}) => {
    const prompts = [
        "What is Monad and how is it different from Ethereum?",
        "How does Monad achieve 10,000 transactions per second?",
        "What is optimistic parallel execution in Monad?",
        "What makes Monad EVM-compatible?",
        "Explain Monad’s single-slot finality mechanism.",
        "Who founded Monad and who are the backers?",
        "Is Monad suitable for DeFi and NFT applications?",
        "When will Monad mainnet launch?"
    ];
    /*const handleClick = (prompt: string) => {
        console.log(`Prompt clicked: ${prompt}`);
    };*/
    return(
        <div className="prompt-suggestion-row">
            {prompts.map((prompt,index) =>
                <PromptSuggestionButton
                    key={`suggestion-${index}`}
                    text={prompt}
                    onClick={()=>onPromptClick(prompt)}
                />)}
        </div>
    );
}
export default PromptSuggestionsRow;