import React from "react";
import urlJoin from "url-join";
import useSWR from "swr";

import { Button, Card } from "@components";

const API_URL = "http://localhost:4000/ideas";

export const Main: React.FC = () => {
    const { data: ideas, mutate } = useSWR(API_URL);
    const setIdeas = mutate;
    const addCard = async () => {
        const freshIdea = { title: "", body: "body" };
        setIdeas([...ideas, freshIdea], false);

        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(freshIdea),
            headers: {
                "Content-Type": "application/json",
            },
        });
        mutate();
    };
    const removeIdea = async (id) => {
        console.log({ id });
        const newIdeas = ideas.filter((idea) => idea.id !== id);
        console.log({ newIdeas });
        setIdeas([...newIdeas], false);
        await fetch(urlJoin(API_URL, id + ""), {
            method: "DELETE",
        });
        mutate();
    };
    const editIdea = async (newIdea) => {
        const newIdeas = ideas.map((idea) =>
            idea.id === newIdea.id ? newIdea : idea,
        );
        // newIdeas[index] = newIdea;

        setIdeas(newIdeas, false);
        await fetch(urlJoin(API_URL, newIdea.id + ""), {
            method: "PUT",
            body: JSON.stringify(newIdea),
            headers: {
                "Content-Type": "application/json",
            },
        });
        mutate();
    };
    return (
        <div className="text-center font-light py-5 bg-gray-700">
            <div className="container mx-auto">
                <h1
                    data-test="main-heading"
                    className="text-white text-8xl mb-2"
                >
                    BrainDump App
                </h1>
                <p className="text-lg text-white mb-3">
                    A place to dump your ideas, even if it's dumb.
                </p>
                <Button type="button" onClick={addCard}>
                    Write idea
                </Button>
                {!ideas && "loading"}
                {ideas && (
                    <div className="flex-1 container my-8 max-w-screen-lg mx-auto p-5 ">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {ideas.map((idea, index) => {
                                return (
                                    <Card
                                        key={idea.id}
                                        remove={removeIdea}
                                        index={index}
                                        idea={idea}
                                        edit={editIdea}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
