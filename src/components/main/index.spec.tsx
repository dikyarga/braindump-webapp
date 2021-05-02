import { render } from "@test";

import { Main } from "./index";

describe("Main component testing with testing-library", () => {
    it("renders without crashing", () => {
        const component = render(<Main />);

        expect(component).toBeTruthy();
    });

    it("renders texts successfuly", () => {
        const { getByText } = render(<Main />);

        getByText("BrainDump App");
        getByText("A place to dump your ideas, even if it's dumb.");
    });

    it("renders button successfuly", () => {
        const { getByText } = render(<Main />);

        getByText("Write idea");
    });
});
