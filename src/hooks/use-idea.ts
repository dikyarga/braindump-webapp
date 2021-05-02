import { useState } from "react";
import useSWR from "swr";
import urlJoin from "url-join";

const API_URL = "http://localhost:4000/ideas";
const headers = {
    "Content-Type": "application/json",
};
const SORT_OPTIONS = {
    DATE: { name: "created_date", displayName: "Sort by Date" },
    TITLE: { name: "title", displayName: "Sort by Title" },
};

export default function useUser() {
    const [currentSort, setSort] = useState(SORT_OPTIONS.DATE.name);
    const { data: ideas, mutate, error } = useSWR(
        urlJoin(API_URL, `?_sort=${currentSort}&_order=asc`),
    );
    const isLoading = !ideas && !error;

    const create = async () => {
        const freshIdea = { title: "", body: "", created_date: new Date() };
        mutate([...ideas, freshIdea], false);

        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(freshIdea),
            headers,
        });
        mutate();
    };
    const edit = async (newIdea) => {
        const newIdeas = ideas.map((idea) =>
            idea.id === newIdea.id ? newIdea : idea,
        );

        mutate(newIdeas, false);
        await fetch(urlJoin(API_URL, newIdea.id + ""), {
            method: "PUT",
            body: JSON.stringify(newIdea),
            headers,
        });
        mutate();
    };
    const remove = async (id) => {
        const newIdeas = ideas.filter((idea) => idea.id !== id);

        mutate([...newIdeas], false);
        await fetch(urlJoin(API_URL, id + ""), {
            method: "DELETE",
        });

        mutate();
    };

    return {
        ideas,
        isLoading,
        create,
        edit,
        remove,
        currentSort,
        setSort,
        SORT_OPTIONS,
    };
}
