import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import {
  forgotPasswordHelper,
  loginHelper
} from 'src/app/helper/apiHelper';
import { animate, group, keyframes, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Router } from '@angular/router';
import { bounce, heartBeat, hinge, jackInTheBox, jello, pulse, rollIn, rollOut, rubberBand, swing, } from 'ng-animate';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.page.html',
  styleUrls: ['./page-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  animations: [

    trigger('heartbeat', [transition('false => true', 
      useAnimation(heartBeat, {
        params: { 
          timing: 1.7,
          delay: 0,
          scale: 0.85,
        }
      }
    ))]),


    trigger('pulse', [transition('false => true', useAnimation(pulse, {  //set time interval to 500
      params: { 
        timing: 0.6,
        delay: 0,
        scale: 0.85,
      }
    }))]),


    trigger('rollInPopOut', [
      transition('false => true', [
        useAnimation(rollOut, {
          params: { 
            timing: 1,
            delay: 0,
            scale: 0.5,
          }
        }),
        useAnimation(jackInTheBox, {
          params: { 
            timing: 1,
            delay: 0,
            scale: 0.85,
          }
        }),
      ])
    ])
  ],
})

export class PageLoginPage implements OnInit {
  screen: string = 'signin';
  loginFormData: FormGroup;
  forgetFormData: FormGroup;
  isLoading: boolean = false;

  // NEW ----
  trigger: boolean = false;
  showAlert: boolean = false;
  showAlertSignUp: boolean = false;
  showAlertForget: boolean = false;
  rotationTimeout: any;

  constructor(private fb: FormBuilder, public navCtrl: NavController, private router: Router) {
    if (localStorage.getItem('token') != null) {
      this.navCtrl.navigateForward(`/home`);
    }
    this.loginFormData = this.fb.group({
      organizationId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.forgetFormData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.rotate();
  }

  ionViewDidEnter(){
    this.reset();
    this.rotate();
  }


  change(event: string) {
    this.screen = event;
  }

  async login() { 
    if (this.loginFormData.valid) {
      this.isLoading = true;
      this.rotate();
      await loginHelper(
        this.loginFormData.get('organizationId')?.value,
        this.loginFormData.get('username')?.value,
        this.loginFormData.get('password')?.value
      );
      if (localStorage.getItem('token') != null) {
        // this.navCtrl.navigateRoot(`/`);
        // this.isLoading = false;
        this.reset();
        this.router.navigate(['/']); //default animation
        
      } else {
        this.reset();
        this.isLoading = false;
        this.showAlert = true;
      }
    }
    else{
      this.showAlert = true;
    }
  }



  reset(){
    this.isLoading = false;
    this.trigger = false;
    this.showAlert = false;
    clearTimeout(this.rotationTimeout);
  }

  rotate(){
    // this.isLoading=true; //ONLY FOR TESTING
    const runRandomizedInterval = () => {
      if (this.isLoading) {
        const randomInterval = 1900;
        this.trigger = !this.trigger;
        // setTimeout(runRandomizedInterval, randomInterval);
        this.rotationTimeout = setTimeout(runRandomizedInterval, randomInterval);
      }
    };
  
    runRandomizedInterval();
  }

  async forget() {
    if (this.forgetFormData.valid) {
      this.isLoading = true;
      let response = await forgotPasswordHelper(
        this.forgetFormData.get('email')?.value
      );
      this.showAlertForget = true;
      // alert(
      //   'If your account exists, you will receive an email with instructions on how to reset your password.'
      // );
      this.isLoading = false;
    }
  }
}
