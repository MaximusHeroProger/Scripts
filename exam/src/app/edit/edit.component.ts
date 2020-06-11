import { Component, OnInit } from '@angular/core';
import {NotesService} from '../services/notes.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {Note} from '../shared/models/note.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public selectedNote: Note;
  public id;
  public title;
  public content;
  public createDate;
  public editDate;
  public completeDate;
  public status;
  noteForm: FormGroup;
  constructor(private notesService: NotesService, private activatedRouter: ActivatedRoute, private router: Router) {
    this.noteForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      createDate: new FormControl(null, [Validators.required]),
      editDate: new FormControl(null, [Validators.required]),
      completeDate: new FormControl(null, [Validators.required]),
      status: new FormControl(true, [Validators.required])
    });
  }

  async ngOnInit() {
    try {
      this.activatedRouter.params.subscribe(param => {
        this.id = param.id;
      });
      const selectedNote = await this.notesService.getNoteById(this.id);
      this.selectedNote = (isNullOrUndefined(selectedNote)) ? [] : selectedNote;
      this.id = this.selectedNote.id;
      this.title = this.selectedNote.title;
      this.content = this.selectedNote.content;
      this.createDate = this.selectedNote.createDate;
      this.editDate = new Date();
      this.completeDate = this.selectedNote.completeDate;
      this.status = this.selectedNote.status;
    } catch (e) {
      console.log(e);
    }
  }
  async onEditNoteFormSubmit() {
    try {
      await this.notesService.putNoteById(this.noteForm.value.id, this.noteForm.value);
      await this.router.navigate(['/']);
    } catch (err) {
      console.log(err);
    }
  }
}
