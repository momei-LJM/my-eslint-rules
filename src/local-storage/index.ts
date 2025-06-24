const plugin = {
  meta: {
    name: "eslint-plugin-example",
    version: "1.2.3",
  },
  processors: {
    "processor-name": {
      preprocess(text, filename) {
        /* ... */
      },
      postprocess(messages, filename) {
        /* ... */
      },
    },
  },
};

export default plugin;
