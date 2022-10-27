import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    content?: string;
}

export default function LoadingScreen({ content = 'Please Wait....' }: Props) {
    return (
        <Dimmer active={true}>
            <Loader content={content} size='huge' />
        </Dimmer>
    )
}