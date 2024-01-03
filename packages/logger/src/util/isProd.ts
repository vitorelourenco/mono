export const isProd = () =>
  /(dev|devel|development)/.test(process.env.NODE_ENV as string);