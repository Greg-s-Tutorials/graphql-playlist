module.exports = {
  projects: {
      app: {
          schema: ["./schema/schema.js"],
          documents: ["**/*.{graphql,js,ts,jsx,tsx}"],
      }
  }
}