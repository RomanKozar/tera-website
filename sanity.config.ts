import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

// NOTE: This config is executed in the browser (Studio), so avoid relying on
// runtime env injection. Keep these values explicit and stable.
const projectId = "kzveqbv5";
const dataset = "production";
const apiVersion = "2026-05-26";

export default defineConfig({
  name: "tera-website",
  title: "ТеРА website",
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
