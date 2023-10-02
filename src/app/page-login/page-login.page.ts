import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { fetchWithCSRF, forgotPasswordHelper, loginHelper } from '../helper/apiHelper';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.page.html',
  styleUrls: ['./page-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class PageLoginPage implements OnInit {
  screen: string = 'signin';
  loginFormData: FormGroup;
  forgetFormData: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, public navCtrl: NavController) { 
    if (localStorage.getItem("token") != null) {
      this.navCtrl.navigateForward(`/home`);
    }
    this.loginFormData = this.fb.group({
      organizationId: ['',[Validators.required]],
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
    });
    this.forgetFormData = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  change(event: string){
    this.screen = event;
  }

  async login(){
    if(this.loginFormData.valid){
      this.isLoading = true
      await loginHelper(this.loginFormData.get('organizationId')?.value, this.loginFormData.get('username')?.value, this.loginFormData.get('password')?.value);
      if (localStorage.getItem("token") != null) {
        this.navCtrl.navigateForward(`/page-prescription-scan`);
      } else {
        alert("Invalid credentials");
        this.isLoading = false
      }
    }  
  }

  async forget() {
    if (!this.forgetFormData.valid) {
      this.isLoading = true;
      let response = await forgotPasswordHelper(this.forgetFormData.get('email')?.value);
      alert("If your account exists, you will receive an email with instructions on how to reset your password.");
      this.isLoading = false;
    }
  }

  async register() {
  }
}
