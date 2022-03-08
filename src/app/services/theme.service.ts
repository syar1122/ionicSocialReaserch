import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer: Renderer2
  private message = new BehaviorSubject<boolean>(null);
  isLight = this.message.asObservable();
  
  constructor(private rendererFactory: RendererFactory2,@Inject(DOCUMENT) private document:Document) {
    this.renderer = this.rendererFactory.createRenderer(null,null);
    this.renderer.addClass(this.document.body,localStorage.getItem('theme'))
    
   }
  toggleTheme(){
    if(!this.document.body.classList.contains('dark')){
      this.renderer.addClass(this.document.body,'dark');
      localStorage.setItem('theme','dark');
      this.message.next(true)
    }else{
      this.renderer.removeClass(this.document.body,'dark');
      this.message.next(false)
      localStorage.setItem('theme','light');
    }
  }
  getTheme(){
    return this.document.body.classList.contains('dark')
  } 
}
