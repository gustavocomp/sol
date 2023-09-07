import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { BrowserStorageKey } from 'src/app/shared/services/storage/storage.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Language } from './../../../shared/enums/language.enum';

@Component({
  selector: 'sol-change-language',
  standalone: true,
  imports: [CommonModule, TranslocoModule, MatMenuModule, MatIconModule, MatButtonModule, MatTooltipModule],
  styleUrls: ['./change-language.component.scss'],
  template: `<button
      mat-icon-button
      matTooltipClass="tooltip"
      matTooltip="{{ 'LANGUAGE.MSG0001' | transloco }}"
      [matMenuTriggerFor]="menu">
      <img class="current-img" [src]="currentImg" alt="flag country" />
    </button>
    <mat-menu #menu="matMenu">
      <button class="language-button" (click)="setLanguage(item.language)" mat-menu-item *ngFor="let item of listLanguage">
        <div class="language-container">
          <img [src]="item.img" alt="flag country" />
          <span>{{ item.name }}</span>
        </div>
      </button>
    </mat-menu>`,
})
export class ChangeLanguageComponent {
  private readonly translocoService = inject(TranslocoService);
  private readonly storageService = inject(StorageService);
  currentImg = 'assets/images/ico-br.png';

  readonly listLanguage = [
    {
      name: this.translocoService.translate('LANGUAGE.MSG0002'),
      language: Language.PT,
      img: 'assets/images/ico-br.png',
    },
    {
      name: this.translocoService.translate('LANGUAGE.MSG0003'),
      language: Language.EN,
      img: 'assets/images/ico-en.png',
    },
    {
      name: this.translocoService.translate('LANGUAGE.MSG0004'),
      language: Language.ES,
      img: 'assets/images/ico-es.png',
    },
  ];

  setLanguage(language: Language): void {
    this.translocoService.setActiveLang(language);
    this.storageService.setItem(BrowserStorageKey.SolLanguage, language);

    this.currentImg = this.listLanguage.find(item => item.language === language)?.img as string;
  }
}
