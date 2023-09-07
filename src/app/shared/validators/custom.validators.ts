import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {
  static email(control: FormControl): { [key: string]: unknown } | null {
    const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(control.value) ? null : { email: true };
  }

  static password(control: FormControl): { [key: string]: unknown } | null {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+[\]{};':"|,.<>/?]).{8,}$/;
    return passwordRegex.test(control.value) ? null : { password: true };
  }

  static compareControls(control: AbstractControl, matchingControl: AbstractControl) {
    return (): {
      notSame: boolean;
    } | null => {
      const error = control.value !== matchingControl.value ? { notSame: true } : null;
      matchingControl.setErrors(error);
      return error;
    };
  }

  static isCPF(control: FormControl): { [key: string]: unknown } | null {
    const errorCPF = { cpf: true };
    const text = control.value;

    if (text == '00000000000' || !text) return errorCPF;

    let sum = 0;
    let rest;
    for (let index = 1; index <= 9; index++) {
      sum = sum + parseInt(text.substring(index - 1, index)) * (11 - index);
    }

    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(text.substring(9, 10))) return errorCPF;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(text.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(text.substring(10, 11))) return errorCPF;
    return null;
  }
}
