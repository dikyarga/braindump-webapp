describe("Homepage", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Brings header", () => {
        cy.getBySel("main-heading").should("contain.text", "BrainDump App");
    });

    it("Should be able to create new idea", () => {
        const writeButton = cy.get("button");

        writeButton.contains("Write idea");
    });
});
