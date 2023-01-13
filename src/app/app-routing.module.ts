import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  {path: 'todo', loadChildren: () => import('./pages/todo/todo.module').then(m => m.TodoModule)},
  {path: 'history', component: HistoryComponent},
  {path: '**', redirectTo: '/todo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
