import { FormControl } from '@angular/forms';
import { Countries, Professions } from '@shared/enums/users.enums';

export interface DialogForm {
  email: FormControl<string | null>;
  name: FormControl<string | null>;
  cpf: FormControl<string | null>;
  country: FormControl<Countries | null>;
  dateBirth: FormControl<Date | null>;
  profession: FormControl<Professions | null>;
  married: FormControl<boolean | null>;
}
