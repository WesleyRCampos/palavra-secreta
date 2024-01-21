import { Component,  EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Output() passwordChange = new EventEmitter<string>();
  showPassword = false;
  password: string = '';

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  onPasswordInput(): void {
    this.passwordChange.emit(this.password);
  }
}
