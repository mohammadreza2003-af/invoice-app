export type SignUpSubmitFrom = {
  email: string;
  password: string;
  fullName: string;
  confirmPassword?: string;
};
export type LoginSubmitFrom = {
  email: string;
  password: string;
};
