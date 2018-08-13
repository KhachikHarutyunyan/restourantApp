import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces';
import { Router, ActivatedRoute, Params } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

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
        // messages
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
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.auth.login(user).subscribe(data => {
      if (data) {
        this.auth.storeUserData(data['token'], data['user']);
        if (data['user']['admin']) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/profile']);
        }
      }
    });
  }
}
