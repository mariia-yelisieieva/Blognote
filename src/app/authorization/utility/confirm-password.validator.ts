import { Directive } from '@angular/core';
import { Validator, FormControl, ValidatorFn, AbstractControl, NG_VALIDATORS, FormGroup } from '@angular/forms';

function validateJuriNameFactory() : ValidatorFn {
  return (c: AbstractControl) => {
    const isValid = (<FormGroup>c.root).controls["password"].value == c.value;

    if (isValid) {
      return null;
    }

    return {
      confirmPassword: {
        valid: false
      }
    };
  }
}

@Directive({
  selector: '[confirmpassword][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ConfirmPasswordValidator, multi: true }
  ]
})
export class ConfirmPasswordValidator implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = validateJuriNameFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
