import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-registerpage',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, RouterModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css'
})
export class RegisterpageComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
