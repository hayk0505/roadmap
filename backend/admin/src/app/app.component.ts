import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { IContentCreation } from './shared/models/content-creation';
import { ContentService } from './shared/services/content/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'admin';
  subsections: Array<any> = [];
  contentNameAndId: Array<Partial<IContentCreation>> = [];
  constructor(
    private contentService: ContentService
  ) { }
  public form: FormGroup = {} as any;
  public disableForm: boolean = false;

  async ngOnInit() {
    this.subsections = [ { name: 'dns', parentId: null, childs: [] }, { name: 'ci/cd' },{ name: 'kubernetis' },{ name: 'docker' }];

    this.form = new FormGroup({
      sectionName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      subsectionName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.contentService.getContentNameAndId().subscribe((data: any) => {
      this.contentNameAndId = data;
    })
  }

  onSubmit(form: any): void {
    if (form.disabled) {
      this.form.enable();
    } else {
      this.disableForm = true;

      this.contentService.updateProfileInfo(this.form.value)
      .pipe(
        tap(
          (res) => console.log(res),
          (err) => {
            this.disableForm = false;
            this.form.disable();
          }
        )
      )
      .subscribe((res) => {
        if (res) {
          this.disableForm = false;
          this.form.disable();
        }
      });
    }
    console.log(form);
  }

  clickOnSubsection (name: string): void {
    //this.form.patchValue({sectionName: name})
  }

  selectedSectionChange(selected: any, selectedid: any): void {
    console.log(selectedid);
    console.log(selected);
    this.form.patchValue({parentId: this.contentNameAndId[selectedid - 1].id});
  }
}
