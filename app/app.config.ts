export default defineAppConfig({
  ui: {
    chip: {
      slots: {
        root: 'relative inline-flex items-center justify-center shrink-0',
        base: 'rounded-full ring ring-transparent flex items-center justify-center text-inverted font-medium whitespace-nowrap',
      },
      variants: {
        color: {
          custom: 'bg-white/50',
        },
      },
    },
    button: {
      slots: {
        base: 'inline-flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
      },
    },
  },
});
