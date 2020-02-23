import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  _A = null;
  _width = null;
  _stepRise = null;

  _goingKite = 0;
  _D = 0;
  _2RG = 0;

  errorRG = false;
  errorD = false;

  constructor(
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this._A = parseFloat(localStorage.getItem('_A'));
    this._width = parseFloat(localStorage.getItem('_width'));
    this._stepRise = parseFloat(localStorage.getItem('_rise'));

    this.onCalculateData();
  }

  async presentModal() {
    const popover = await this.modalController.create({
      component: InfoComponent
    });
    return await popover.present();
  }

  onOpenInfo() {
    this.presentModal();
  }

  onCalculateData() {
    
    const  _A = parseFloat(this._A);
    const _width = parseFloat(this._width);
    const _rise = parseFloat(this._stepRise);

    let _D = _A - _width;
    let _R = _width/2 + _D;
    let _cir = 2 * Math.PI * _R;
    let _gK = _cir / 8;

    if(_A && _width) {
      this._goingKite = Number(_gK.toFixed(1));
      this._D = Number(_D.toFixed(1));
      if (_D < 50) {
        this.errorD = true;
      }
      localStorage.setItem('_A', _A.toString());
      localStorage.setItem('_width', _width.toString());
      localStorage.setItem('_rise', _rise.toString());
    } else {
        this._goingKite = null;
        this._D = null;
        this.errorD = false;
    }

    if(_rise && _gK) {
        let _rg = _gK + 2 * _rise;
        this._2RG = Number(_rg.toFixed(1));
        if (_rg < 500) {
          this.errorRG = true;
        } else if(_rg > 750) {
          this.errorRG = true;
        } else {
          this.errorRG = false;
        }
    } else {
        let _rg = null;
        this._2RG = null;
        this.errorRG = false;
    }

  }

}
