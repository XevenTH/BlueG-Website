import { Message, MessageHeader, MessageItem } from "semantic-ui-react";

interface Props {
    error: any
}

export default function ErrorView({ error }: Props) {
    return (
        <Message error>
            {error && (
                <MessageHeader>
                    ERRORS !!
                    <p></p>
                    {error.map((x: any, i: any) => (
                        <MessageItem key={i}>{x}</MessageItem>
                    ))}
                </MessageHeader>
            )}
        </Message>
    )
}