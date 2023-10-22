import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { loginHelper, authorisedFetch } from 'src/app/helper/apiHelper';

@Component({
  selector: 'app-page-reward-details',
  templateUrl: './page-reward-details.page.html',
  styleUrls: ['./page-reward-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PageRewardDetailsPage implements OnInit {
  public page_name: string = 'Reward';
  public title: any;
  public description: any;
  public term_condition: any;
  public point: any;
  private reward_id: any;
  public rewards: any;
  public image: any;
  public type: any;
  public claimed: boolean = false;

  constructor() {}

  async ngOnInit() {
    await loginHelper('2', 'adelinelim', '12345678');
    // read the url and get the id
    // var url = window.location.href;
    // var param = url.substring(url.lastIndexOf('=') + 1);
    // console.log(param);
    // this.reward_id = param.charAt(0).toUpperCase() + param.slice(1);
    this.reward_id = 5;
    try {
      this.rewards = await this.getRewards(this.reward_id);
      console.log(this.rewards);

      this.page_name = this.rewards.reward_name;
      this.title = this.rewards.reward_name;
      this.description = this.rewards.reward_description;
      this.term_condition = this.rewards.reward_term_condition;
      this.point = this.rewards.required_points;
      this.image = this.rewards.image;
      this.type = this.rewards.type;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  preloadReward() {
    this.title = 'This is title';
    this.description = 'This is description';
    this.term_condition = 'This is term condition';
  }

  async getRewards(reward_id: number) {
    try {
      const response = await authorisedFetch(
        `v1/patient/get/one-reward`,
        'GET',
        { id: reward_id }
      );

      const data = await response?.data;

      return data.result;
    } catch (error) {
      throw `page-reward-detail.page.ts -> getRewards ${error}`;
    }
  }

  async redeem() {
    try {
      const response = await authorisedFetch(
        `v1/patient/put/claim-reward`,
        'PUT',
        { id: this.reward_id }
      );

      const data = await response?.data;

      if (data.status == 200) {
        // this.claimed = true;
        this.afterClaimed();
      }
    } catch (error) {
      throw `page-reward-detail.page.ts -> redeem ${error}`;
    }
  }

  afterClaimed() {
    console.log('afterClaimed');
    this.claimed = true;
    const claimBtn = document.getElementById('claim-btn');
    if (claimBtn !== null) {
      claimBtn.setAttribute('disabled', 'true');
      claimBtn.innerHTML = 'Claimed';
      claimBtn.setAttribute('color', 'success');
    }
  }
}
