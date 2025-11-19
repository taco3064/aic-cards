export function useExtractClasses<Props extends { classes?: Classes<string> }>(
  prefix: string,
  classes: Classes<string> = {},
) {
  const regex = new RegExp(`^${prefix}([A-Z])`);

  return Object.entries(classes).reduce<NonNullable<Props['classes']>>(
    (acc, [key, value]) => ({
      ...acc,
      ...(regex.test(key) && {
        [key.replace(prefix, '').toLowerCase()]: value,
      }),
    }),
    {},
  );
}
