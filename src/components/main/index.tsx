import React from "react";

import { Button, Card } from "@components";
import useIdea from "../../hooks/use-idea";

export const Main: React.FC = () => {
    const {
        ideas,
        create,
        edit,
        remove,
        currentSort,
        setSort,
        SORT_OPTIONS,
    } = useIdea();

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
                <Button type="button" onClick={create}>
                    Write idea
                </Button>
                {!ideas && "loading"}
                <div>
                    <select
                        value={currentSort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        {Object.keys(SORT_OPTIONS).map((sort) => (
                            <option value={SORT_OPTIONS[sort].name} key={sort}>
                                {SORT_OPTIONS[sort].displayName}
                            </option>
                        ))}
                    </select>
                </div>
                {ideas && (
                    <div className="flex-1 container my-8 max-w-screen-lg mx-auto p-5 ">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {ideas.map((idea) => {
                                return (
                                    <Card
                                        key={idea.id}
                                        remove={remove}
                                        idea={idea}
                                        edit={edit}
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
