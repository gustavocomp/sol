import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ChangeLanguageComponent } from '../change-language/change-language.component';

@Component({
  selector: 'sol-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TranslocoModule,
    ChangeLanguageComponent,
  ],
  providers: [MatDrawer],
})
export class ToolbarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) matDrawer: MatDrawer;
  sideNavIsOpened = true;

  tooltipMessage = '';
  toogleIcon = '';

  ngOnInit(): void {
    this.changeMessageAndIcon();
    this.observeDrawer();
  }

  private changeMessageAndIcon(): void {
    this.tooltipMessage = this.sideNavIsOpened ? 'LABELS.MSG0011' : 'LABELS.MSG0012';
    this.toogleIcon = this.sideNavIsOpened ? 'menu' : 'menu_open';
  }

  private observeDrawer(): void {
    this.matDrawer.openedChange?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(opened => {
      this.sideNavIsOpened = opened;
      this.changeMessageAndIcon();
    });
  }

  toogleSideNav(): void {
    this.sideNavIsOpened = !this.sideNavIsOpened;
    this.matDrawer?.toggle();
    this.changeMessageAndIcon();
  }

  logout(): void {
    this.storageService.removeAllMyItems();
    this.router.navigate(['/sign-in']);
  }
}
