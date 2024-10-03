describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/admin-hyundai");
  });

  it("should display login page correctly", () => {
    // Pastikan elemen yang ada pada halaman login muncul
    cy.get('input[placeholder="username"]', { timeout: 10000 }).should("be.visible");
    cy.get('input[placeholder="Password"]', { timeout: 10000 }).should("be.visible");
    cy.get("button").contains(/^Login$/, { timeout: 10000 }).should("be.visible");
  });

  it("should display alert when password is empty", () => {
    cy.get('input[placeholder="username"]').type("testuser@example.com");
    cy.get("button").contains(/^Login$/).click();

    // Tunggu alert muncul
    cy.on("window:alert", (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it("should display alert when username is empty", () => {
    cy.get('input[placeholder="Password"]').type("testpassword");
    cy.get("button").contains(/^Login$/).click();

    // Tunggu alert muncul
    cy.on("window:alert", (str) => {
      expect(str).to.equal('"username" is not allowed to be empty');
    });
  });

  it("should display alert when username and password are wrong", () => {
    cy.get('input[placeholder="username"]').type("testuser@example.com");
    cy.get('input[placeholder="Password"]').type("wrong_password");
    cy.get("button").contains(/^Login$/).click();

    // Tunggu alert muncul
    cy.on("window:alert", (str) => {
      expect(str).to.equal("User ID or password is wrong");
    });
  });

  it("should display homepage when username and password are correct", () => {
    cy.get('input[placeholder="username"]').type("alfiyudha");
    cy.get('input[placeholder="Password"]').type("@Alvi234");
    cy.get("button").contains(/^Login$/).click();
    cy.url().should("include", "/admin-hyundai/dashboard");
    cy.get("nav").contains(/^Home$/, { timeout: 10000 }).should("be.visible");
    cy.get("button").contains("Sign out", { timeout: 10000 }).should("be.visible");
  });
});
