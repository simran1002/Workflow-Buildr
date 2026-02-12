export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: Array<{
    type: "clean" | "summarize" | "extract" | "tag";
    promptTemplate: string;
    order: number;
  }>;
}

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: "clean-summarize",
    name: "Clean & Summarize",
    description: "Clean messy text and produce a concise summary",
    steps: [
      {
        type: "clean",
        promptTemplate:
          "Clean and normalize the following text. Fix typos, remove extra whitespace, and format consistently. Return only the cleaned text, no explanations.\n\n{input}",
        order: 0,
      },
      {
        type: "summarize",
        promptTemplate:
          "Summarize the following text concisely in 2-3 sentences. Preserve key information.\n\n{input}",
        order: 1,
      },
    ],
  },
  {
    id: "extract-tag",
    name: "Extract & Tag",
    description: "Extract key entities and assign tags",
    steps: [
      {
        type: "extract",
        promptTemplate:
          "Extract the main entities from this text: people, organizations, dates, locations. List each on a new line in format: TYPE: value\n\n{input}",
        order: 0,
      },
      {
        type: "tag",
        promptTemplate:
          "Assign 3-5 relevant tags to categorize this content. Return only comma-separated tags, nothing else.\n\n{input}",
        order: 1,
      },
    ],
  },
  {
    id: "full-pipeline",
    name: "Full Pipeline",
    description: "Clean, summarize, extract, and tag in one workflow",
    steps: [
      {
        type: "clean",
        promptTemplate:
          "Clean and normalize the text. Fix typos, remove extra whitespace. Return only cleaned text.\n\n{input}",
        order: 0,
      },
      {
        type: "summarize",
        promptTemplate:
          "Summarize in 2-3 sentences.\n\n{input}",
        order: 1,
      },
      {
        type: "extract",
        promptTemplate:
          "Extract key entities (people, orgs, dates). One per line: TYPE: value\n\n{input}",
        order: 2,
      },
      {
        type: "tag",
        promptTemplate:
          "Assign 3-5 comma-separated tags.\n\n{input}",
        order: 3,
      },
    ],
  },
];
