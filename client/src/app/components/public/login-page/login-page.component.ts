import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, ObjectUnsubscribedError } from 'rxjs';
import { MaterialService } from '../../../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  asab: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Now you can sign in!');
      } else if (params['accessDenied']) {
        MaterialService.toast('You need to authorization!');
      } else if (params['sessionFailed']) {
        MaterialService.toast('Please sign in again');
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.form.disable();
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    // this.asab = this.auth.login(user).subscribe(data => {
    //   if (data) {
    //     this.auth.storeUserData(data['token'], data['user']);
    //     if (data['user']['admin']) {
    //       this.router.navigate(['/admin']);
    //     } else {
    //       this.router.navigate(['/profile']);
    //     }
    //   }
    // });

    this.asab = this.auth.login(user).subscribe(
      (data) => {
        if (data['user']['admin']) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
      err => {
        MaterialService.toast(err.error.message);
        this.form.enable();
      }
    );
  }

  ngOnDestroy() {
    if (this.asab) {
      this.asab.unsubscribe();
    }
  }
}
