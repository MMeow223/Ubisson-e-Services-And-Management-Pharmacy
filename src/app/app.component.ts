import { Component, EnvironmentInjector, inject, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);
  private setClass = false;

  constructor(private elementRef: ElementRef) {
    // NEW - Need to build and test
    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setStyle({ style: Style.Light });
    //if keyboard is open, add padding to the bottom of the app
    window.addEventListener('keyboardDidShow', (info) => {
      if (!this.setClass) {
        let stylesheet = document.styleSheets[0];
        stylesheet.insertRule(`.keyboard-open { margin-bottom: ${(info as any).keyboardHeight}px !important; }`, 0);
        this.setClass = true;
      }
      this.elementRef.nativeElement.querySelectorAll('#ion-app')[0].classList.add('keyboard-open');
      this.elementRef.nativeElement.querySelectorAll(':focus')[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    //if keyboard is closed, remove padding from the bottom of the app
    window.addEventListener('keyboardDidHide', () => {
      this.elementRef.nativeElement.querySelectorAll('#ion-app')[0].classList.remove('keyboard-open');
    });
  }
}
