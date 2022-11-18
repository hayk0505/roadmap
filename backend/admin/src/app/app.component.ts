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
  bindUrl: any;
  subsections: Array<any> = [];
  contentNameAndId: Array<Partial<IContentCreation>> = [];
  isOpenDropDawn: boolean = false;
  isShowSubsection: boolean = false;
  node: any;
  constructor(
    private contentService: ContentService
  ) { }
  public form: FormGroup = {} as any;
  public disableForm: boolean = false;

  async ngOnInit() {
    this.subsections = [ { name: 'dns', parentId: null, childs: [] }, { name: 'ci/cd' },{ name: 'kubernetis' },{ name: 'docker' }];

    this.form = new FormGroup({
      name: new FormControl('', [
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
      parentId: new FormControl(''),
    });

    this.contentService.getContentNameAndId().subscribe((data: any) => {
      this.contentNameAndId = data;
      this.createTreeForMenu(data);
    })
  }

  createTreeForMenu(data: any) {
    const idMapping = data.reduce((acc: any, el: any, i: any) => {
      acc[el.id] = i;
      return acc;
    }, {});
    data.forEach((el: any) => {
      if (el.parentId === null) {
        return;
      }
      const parentEl = data[idMapping[el.parentId]];
      parentEl.children = [...(parentEl.children || []), el];
    });
    this.node = this.subsections = data.filter((item: any) => { return item.parentId === null });
    console.log(this.node);
  }

  selectFromMenu(id: any): void {
    let child = document.getElementById(`label${id}`) as HTMLLabelElement;
    child.classList.remove('hidden')
    console.log(child.childNodes[1].childNodes[0].childNodes);
    child.childNodes[1].childNodes[0].childNodes.forEach((item: any) => {
      item?.classList?.remove('hidden');
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

  selectedSectionChange(): void {
    this.isShowSubsection = false;
  }

  sectionDropDown(): void {
    if (this.contentNameAndId.length) {
      this.isOpenDropDawn = !this.isOpenDropDawn;
    }
  }

  selectedSectionUpdate(selected: any, selectedid: any): void {
    console.log(selectedid);
    console.log(selected);
    if (!this.contentNameAndId[selectedid - 1]) {
      return;
    } else {
      this.form.patchValue({parentId: this.contentNameAndId[selectedid - 1].id});
      this.form.patchValue({name: selected});
      this.sectionDropDown();
      this.isShowSubsection = true;
    }
  }
}
