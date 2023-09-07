import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom.validators';

describe('CustomValidators', () => {
  describe('email', () => {
    it('should return null for a valid email', () => {
      const control = new FormControl('test@example.com');
      const result = CustomValidators.email(control);
      expect(result).toBeNull();
    });

    it('should return an error object for an invalid email', () => {
      const control = new FormControl('invalid-email');
      const result = CustomValidators.email(control);
      expect(result).toEqual({ email: true });
    });
  });

  describe('password', () => {
    it('should return null for a valid password', () => {
      const control = new FormControl('Abc123!@');
      const result = CustomValidators.password(control);
      expect(result).toBeNull();
    });

    it('should return an error object for an invalid password', () => {
      const control = new FormControl('weakpassword');
      const result = CustomValidators.password(control);
      expect(result).toEqual({ password: true });
    });
  });

  describe('compareControls', () => {
    it('should return null if controls match', () => {
      const control = new FormControl('password');
      const matchingControl = new FormControl('password');
      const validatorFn = CustomValidators.compareControls(control, matchingControl);
      const result = validatorFn();
      expect(result).toBeNull();
      expect(matchingControl.errors).toBeNull();
    });

    it('should return an error object if controls do not match', () => {
      const control = new FormControl('password');
      const matchingControl = new FormControl('mismatched');
      const validatorFn = CustomValidators.compareControls(control, matchingControl);
      const result = validatorFn();
      expect(result).toEqual({ notSame: true });
      expect(matchingControl.errors).toEqual({ notSame: true });
    });
  });
});
