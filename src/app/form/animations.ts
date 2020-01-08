import {animate, style, transition, trigger} from '@angular/animations';

export const rowAnim = trigger('rowAnim', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(-120%)', position: 'relative', 'z-index': -1}),
    animate('0.15s ease-out', style({opacity: 1, transform: 'none'})),
  ]),
  transition(':leave', [
    animate('0.35s ease-out', style({opacity: 0, transform: 'translateX(-100%)'})),
  ])
]);
