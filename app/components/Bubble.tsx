import { Message } from "ai";

const Bubble = ({ message }: { message: Message }) => {
    return (
        <div className={`bubble ${message.role}`}>
            <p>{message.content}</p>
        </div>
    );
};

export default Bubble;
