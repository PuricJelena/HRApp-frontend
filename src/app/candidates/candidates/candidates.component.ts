import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  candidates = [] as any;
  candidateId: any;
  skillId: any;
  selectedSkill: any;
  skills = [] as any;
  form: FormGroup;
  form1: FormGroup;
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { 
    this.form = this.formBuilder.group({
      searchTerm: ['']
     
    })
    this.form1 = this.formBuilder.group({
      skillId: ['']
     
    })
  }

  ngOnInit(): void {
    this.api.getCandidates().subscribe((response:any) => {
      this.candidates = response;      
    });

    this.api.getSkills().subscribe((response:any) => {
      this.skills = response;      
    });
  }

  onDelete(id: number) {
    this.api.deleteCandidate(id).subscribe((response:any) => {
    
     this.candidates = response;
     if(response == true){
     
      window.location.reload();
    } else if( response === false){
        alert("Can't delete")
    }
  });
  }

  onSearch(){
    const searchTerm = this.form.get('searchTerm')?.value;
  
    let data = {
      searchTerm: searchTerm   
    }
  
    this.api.searchCandidates(data).subscribe((response: any) => {
      console.log(response);
      this.candidates = response;
    });
  }

  onSave(candidateId: number) {
    const skillId = this.form1.get('skillId')?.value;
    

      const data = {
        skillId: skillId,
        candidateId: candidateId
      }
  
      this.api.addJobCandidateSkill(data).subscribe((response: any) => {
        console.log(response);
        if (response == null) {
          this._snackBar.open('You have successfully added skill to a candidate. ', 'Close', { duration: 100000 });
        }
        location.reload();
      });
    
  }
  

}
