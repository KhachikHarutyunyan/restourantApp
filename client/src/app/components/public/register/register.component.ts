import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.nameValidator
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        this.emailValidator
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.passwordValidator
      ])],
      confirm: ['', Validators.compose([
        Validators.required,
      ])],
    }, { validator: this.matchingPassword('password', 'confirm') });
  }

  nameValidator(controls) {
    const regExp = new RegExp(/^[a-zA-Z]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'nameValidator': true
      };
    }
  }

  emailValidator(controls) {
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'emailValidator': true
      };
    }
  }

  passwordValidator(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'passwordValidator': true
      };
    }
  }

  matchingPassword(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls.password.value === group.controls.confirm.value) {
        return null;
      } else {
        return {
          'matching': true
        };
      }
    };
  }

  onSubmit() {
    const user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.register(user).subscribe(data => {
      console.log(data);
    });
  }

}
