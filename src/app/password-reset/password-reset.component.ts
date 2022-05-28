import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../_services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control?.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  @Input() code: any;
  show = false;
  error = false;
  resetPasswordFormGroup: FormGroup = new FormGroup({});
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.resetPasswordFormGroup = this.formBuilder.group({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  get P() {
    return this.resetPasswordFormGroup.get('newPassword');
  }

  ngOnInit(): void {
  }

  changeP() {
    if (this.userService.changeP(this.code, this.P?.value).subscribe()) {
      this.show = true;
    } else {
      this.error = true;
      this.show = false;
    }
  }

}
