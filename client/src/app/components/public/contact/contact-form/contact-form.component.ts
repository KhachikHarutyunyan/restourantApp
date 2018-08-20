import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  form: FormGroup;

  showBtn = false;

  constructor(
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
        Validators.minLength(5),
        Validators.maxLength(30),
        this.nameValidator
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        this.emailValidation
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.phoneValidator
      ])],
      message: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(300)
      ])],
    });
  }

  emailValidation(controls) {
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

  phoneValidator(controls) {
    const regExp = new RegExp(/^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'phoneValidator': true
      };
    }
  }

  onSubmit() {
    console.log(this.form);
  }

}
