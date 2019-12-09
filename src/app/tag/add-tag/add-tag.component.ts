import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TagModel} from '../../_models/tag.model';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  tags: TagModel[] = [];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;

  constructor(private crudService: CrudService,
              private router: Router) {
  }

  ngOnInit() {
  }


  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: TagModel): string {
    const isLongTag = tag.name.length > 20;
    return isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.map(tag => tag.name).indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, new TagModel(this.inputValue)];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  handleSave() {
    console.log(this.tags);
    this.crudService.post(Globals.API_URL + Globals.TAG + '/batch', this.tags).subscribe(
      (data) => {
        console.log(data);
        this.router.navigateByUrl('/tag');
      }
    );
  }
}
