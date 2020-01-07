import {animate, style, transition, trigger} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(-100%)'}),
    animate('0.15s ease-out', style({opacity: 1, transform: 'none'})),
  ]),
  transition(':leave', [
    animate('0.15s ease-out', style({opacity: 0})),
  ])
]);
