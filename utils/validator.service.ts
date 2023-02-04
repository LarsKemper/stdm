export const validator = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  name: (value: string) =>
    value.length < 2 ? 'Name must have at least 2 letters' : null,
  password: (value: string) =>
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(value)
      ? null
      : 'Invalid password. Must contain: 1 number, 1 uppercase letter, 1 lowercase letter, 1 non-alpha numeric number, 8-16 characters',
};
