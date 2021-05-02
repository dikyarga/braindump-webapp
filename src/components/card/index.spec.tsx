import { render } from "@test";

import { Card } from "./index";

const idea = {
    id: 99,
    title: "This is a title",
    body: "this is a description",
    created_date: new Date(),
};

describe("Cards component testing with testing-library", () => {
    it("renders without crashing", () => {
        const component = render(<Card idea={idea} />);

        expect(component).toBeTruthy();
    });

    it("cards length must be equal to the length of the meta data ", () => {
        const { getByText } = render(<Card idea={idea} />);

        getByText(idea.title);
        getByText(idea.body);
    });
});
