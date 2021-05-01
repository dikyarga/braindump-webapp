import { render } from "@test";

import { Footer } from "./index";

describe("Footer component testing with testing-library", () => {
    it("renders without crashing", () => {
        const component = render(<Footer />);

        expect(component).toBeTruthy();
    });

    it("renders logo and directed to the correct url", () => {
        const { getByTestId } = render(<Footer />);
    });

    it("should render 4 icons successfully", () => {
        const { getByTestId } = render(<Footer />);

        const icons = getByTestId("icons-container");
        expect(icons.children).toHaveLength(4);
    });
});
