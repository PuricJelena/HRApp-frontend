import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates/candidates.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { JobCandidateComponent } from './job-candidate/job-candidate.component';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';
const routes: Routes = [
  { path: '', component: FrontpageComponent},
  { path: "candidates", component: CandidatesComponent},
  {path: "job-candidate", component: JobCandidateComponent},
  {path: "update-candidate", component: UpdateCandidateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
