import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AccountService } from '../account.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    returnUrl: string;
    invalidLogin: boolean;
    ErrorMessage: string;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private account: AccountService,
        private router: Router,
        private route: ActivatedRoute
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/club/profile';
        this.loginForm = this._formBuilder.group({
            username   : ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    /**
     * On Submit
     */
    onSubmit() {
      let userlogin = this.loginForm.value;
      this.account.login(userlogin.username, userlogin.password).subscribe(result =>{
        let token = (<any>result).token;
        console.log(token);
        console.log(result.userRole);
        console.log("User Logged In Successfully");
        this.invalidLogin= false;
        console.log(this.returnUrl);
        this.router.navigateByUrl(this.returnUrl);
  
      }, error => {
        this.invalidLogin = true;
        this.ErrorMessage = "InValid details Supplied - Could not Log in";
        console.log(this.ErrorMessage);
      });
    }
}
