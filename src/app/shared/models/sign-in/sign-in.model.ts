import { FormControl } from '@angular/forms';

export interface SignIn {
  email: string;
  password: string;
}

export type SignInForm = {
  [key in keyof SignIn]: FormControl<SignIn[key] | null>;
};
