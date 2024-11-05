export default defineAppConfig({
  ui: {
    colors: {
      neutral: 'zinc',
      primary: 'violet',
      // @ts-expect-error 'secondary' is defined in css but not in ts
      secondary: 'secondary',
    },
  },
})
