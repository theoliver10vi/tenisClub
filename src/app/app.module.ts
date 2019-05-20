import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from "./services/users.service";
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage';


// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TorneosComponent } from './tournaments/tournaments.component';
import { CardsTorneosComponent } from './tournaments/cards-tournaments/cards-tournaments.component';
import { CardsJugadoresComponent } from './tournaments/cards-players/cards-players.component';
import { ScoresComponent } from './scores/scores.component';
import { DateResultsComponent } from './scores/date-results/date-results.component';
import { RankingsComponent } from './rankings/rankings.component';
import { BrochureViewComponent } from './brochure-view/brochure-view.component';
import { CdkTableModule } from '@angular/cdk/table';
import { TournamentBracketComponent } from './tournament-bracket/tournament-bracket.component';
import { MatchScoreComponent } from './tournament-bracket/match-score/match-score.component';
import { SelectedTournamentComponent } from './selected-tournament/selected-tournament.component';
import { TournamentInfoComponent } from './selected-tournament/tournament-info/tournament-info.component';
import { TournamentBracketInfoComponent } from './selected-tournament/tournament-bracket-info/tournament-bracket-info.component';
import { MatchScoreInfoComponent } from './tournament-bracket/match-score-info/match-score-info.component';
import { SelectedPlayerComponent } from './selected-player/selected-player.component';
import { TournamentManagementComponent } from './tournament-management/tournament-management.component';
import { TournamentRegistrationComponent } from './tournament-management/tournament-registration/tournament-registration.component';
import { PlayerRegistrationComponent } from './tournament-management/player-registration/player-registration.component';
import { ScoreDialogComponent } from './tournament-bracket/score-dialog/score-dialog.component';

// Material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MaterialElevationDirective } from './material-elevation.directive';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { PlayerLoggedComponent } from './player-logged/player-logged.component';
import { MatCheckboxModule, MatPaginatorModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSnackBarModule } from "@angular/material";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';

// Tuberías
import { MatchResultPipe } from './pipes/match-result.pipe';
import { RefereeComponent } from './referee/referee.component';
import { PointsPipe } from './pipes/points.pipe';
import { MatchScoreAdminComponent } from './tournament-bracket-admin/match-score-admin/match-score-admin.component';
import { TournamentBracketAdminComponent } from './tournament-bracket-admin/tournament-bracket-admin.component';
import { SuspendedPipe } from './pipes/suspended.pipe';
import { SelectedTournamentAdminComponent } from './selected-tournament-admin/selected-tournament-admin.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resultados', component: ScoresComponent },
  { path: 'rankings', component: RankingsComponent },
  { path: 'torneos', component: TorneosComponent },
  // { path: 'jugador-seleccionado', component: SelectedPlayerComponent },
  { path: 'jugador-seleccionado/:imageP', component: SelectedPlayerComponent },
  { path: 'torneo-seleccionado/:imageT', component: SelectedTournamentComponent },
  { path: 'admin-torneo/:imageT', component: SelectedTournamentAdminComponent },
  { path: 'convocatorias', component: BrochureViewComponent },
  { path: 'jugador/:password', component: PlayerLoggedComponent },
  { path: 'admin', component: TournamentManagementComponent },
  { path: 'usuario', component: PlayerLoggedComponent },
  { path: 'arbitro', component: RefereeComponent },
  { path: 'arbitro/:idTorneoSeleccionado', component: TournamentBracketComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MaterialElevationDirective,
    TorneosComponent,
    CardsJugadoresComponent,
    CardsTorneosComponent,
    ScoresComponent,
    DateResultsComponent,
    RankingsComponent,
    BrochureViewComponent,
    TournamentBracketComponent,
    LoginComponent,
    MatchScoreComponent,
    PlayerLoggedComponent,
    SelectedTournamentComponent,
    TournamentInfoComponent,
    TournamentBracketInfoComponent,
    MatchScoreInfoComponent,
    SelectedPlayerComponent,
    TournamentManagementComponent,
    TournamentRegistrationComponent,
    PlayerRegistrationComponent,
    MatchResultPipe,
    RefereeComponent,
    ScoreDialogComponent,
    PointsPipe,
    MatchScoreAdminComponent,
    TournamentBracketAdminComponent,
    SuspendedPipe,
    SelectedTournamentAdminComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatPaginatorModule,
    CdkTableModule,
    RouterModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Tengular'),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    AngularFireStorageModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    AppComponent,
    TournamentRegistrationComponent,
    PlayerRegistrationComponent,
    ScoreDialogComponent
  ]
})
export class AppModule { }
