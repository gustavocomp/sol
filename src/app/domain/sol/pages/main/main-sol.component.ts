import { CommonModule } from '@angular/common';
import { Component, DestroyRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { SolMenu } from 'src/app/shared/models/main/main.model';
import { BrowserStorageKey } from 'src/app/shared/services/storage/storage.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TokenService } from 'src/app/shared/services/token/token.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MENU } from 'src/app/shared/constants/menu.constants';
import { BreakpointView } from 'src/app/shared/enums/breackpoint-view.enum';
import { AvatarComponent } from 'src/app/widget/components/avatar/avatar.component';
import { ToolbarComponent } from 'src/app/widget/components/toolbar/toolbar.component';
import { ResizeDirective } from 'src/app/widget/directives/resize.directive';

@Component({
  selector: 'sol-main',
  templateUrl: './main-sol.component.html',
  styleUrls: ['./main-sol.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule,
    ToolbarComponent,
    AvatarComponent,
    ResizeDirective,
  ],
})
export class MainSolComponent implements OnInit {
  private readonly storageService = inject(StorageService);
  private readonly tokenService = inject(TokenService);
  private readonly translocoService = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);
  @ViewChild('drawer', { static: true }) readonly matDrawer: MatDrawer;

  email = '';
  listMenu: SolMenu[] = [];
  matDrawerMode: MatDrawerMode = 'side';

  ngOnInit(): void {
    this.setEmailByToken();
    this.buildListMenu();
    this.observeChangeLanguage();
    this.menagerDrawer();
    this.onResize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.menagerDrawer();
  }

  private setEmailByToken(): void {
    this.email = this.tokenService.decodeToken(this.storageService.getItem(BrowserStorageKey.SolToken) as string)['email'];
  }

  private menagerDrawer(): void {
    const smallScreen = window.innerWidth < BreakpointView.SM;
    this.matDrawer[smallScreen ? 'close' : 'open']();
    this.matDrawerMode = smallScreen ? 'over' : 'side';
  }

  private buildListMenu(): void {
    this.listMenu = MENU;
  }

  private observeChangeLanguage(): void {
    this.translocoService.langChanges$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.buildListMenu();
    });
  }
}
