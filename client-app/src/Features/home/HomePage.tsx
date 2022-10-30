import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Segment>
            <h1 style={{ "textAlign": "center", marginTop: '1em' }}>Home Page</h1>
            <Container>
                <Link to={'/games'}>
                    <h3 style={{ "textAlign": "center" }}>Search For Room </h3>
                </Link>
            </Container>
        </Segment>
    )
}