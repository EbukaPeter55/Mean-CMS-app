import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule, MatExpansionModule,
    MatProgressSpinner, MatProgressSpinnerModule, MatPaginatorModule, MatDialogModule} from '@angular/material';
 

@NgModule({
exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,   
    MatPaginatorModule,    
    MatProgressSpinnerModule,
    MatDialogModule
]
})

export class AngularMaterialModule {}