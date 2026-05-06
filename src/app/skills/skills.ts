import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skill } from '../models/skills/skills.model';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class SkillsComponent implements OnInit {
  skillsList: Skill[] = [];
  skillsForm!: FormGroup;
  showForm = false;
  editingId: string | null = null;
  loading = false;
  submitted = false;

  proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  constructor(
    private skillsService: SkillsService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSkills();
  }

  initializeForm(): void {
    this.skillsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      level: ['', Validators.required],
      category: ['']
    });
  }

  loadSkills(): void {
    this.loading = true;
    this.skillsService.getSkills().subscribe({
      next: (data: Skill[]) => {
        this.skillsList = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error loading skills:', err);
        this.loading = false;
      }
    });
  }

  openForm(item?: Skill): void {
    this.submitted = false;
    if (item) {
      this.editingId = item.id ?? null;
      this.skillsForm.patchValue(item);
    } else {
      this.editingId = null;
      this.skillsForm.reset();
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.skillsForm.reset();
    this.editingId = null;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.skillsForm.invalid) return;

    this.loading = true;
    const formData = this.skillsForm.value;

    if (this.editingId) {
      this.skillsService.updateSkill(this.editingId, formData).subscribe({
        next: () => {
          this.loadSkills();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error updating skill:', err);
          this.loading = false;
        }
      });
    } else {
      this.skillsService.createSkill(formData).subscribe({
        next: () => {
          this.loadSkills();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error creating skill:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteSkill(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta habilidad?')) {
      this.loading = true;
      this.skillsService.deleteSkill(id).subscribe({
        next: () => {
          this.loadSkills();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error deleting skill:', err);
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.skillsForm.controls;
  }
}
