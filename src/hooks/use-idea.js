import useSWR from "swr";
import urlJoin from "url-join";

const API_URL = "http://localhost:4000/ideas";
const headers = {
    "Content-Type": "application/json",
};

export default function useUser() {
    const { data: ideas, mutate, error } = useSWR(API_URL);
    const isLoading = !ideas && !error;

    const create = async () => {
        const freshIdea = { title: "", body: "body" };
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
    };
}
