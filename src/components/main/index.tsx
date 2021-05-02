import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button, Card } from "@components";

export const Main: React.FC = () => {
    const [ideas, setIdeas] = useState([]);
    const addCard = () => {
        setIdeas([...ideas, { id: uuidv4(), title: "title", body: "body" }]);
    };
    const removeIdea = (id) => {
        console.log({ id });
        const newIdeas = ideas.filter((idea) => idea.id !== id);
        console.log({ newIdeas });
        setIdeas([...newIdeas]);
    };
    const editIdea = (newIdea) => {
        const newIdeas = ideas.map((idea) =>
            idea.id === newIdea.id ? newIdea : idea,
        );
        // newIdeas[index] = newIdea;

        setIdeas(newIdeas);
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
            </div>
        </div>
    );
};
