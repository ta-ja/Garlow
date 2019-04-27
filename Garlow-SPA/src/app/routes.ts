import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationsListResolver } from './_resolvers/locations-list.resolver';
import { AddLocationComponent } from './add-location/add-location.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationDetailResolver } from './_resolvers/location-detail.resolver';
import { LocationDetailMovementsResolver } from './_resolvers/location-detail-movements.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'locations', component: LocationsListComponent, resolve: { locations: LocationsListResolver } },
            {
                path: 'locations/:locationid',
                component: LocationDetailComponent,
                resolve:
                {
                     location: LocationDetailResolver,
                     movements: LocationDetailMovementsResolver
                }
            },
            { path: 'add-location', component: AddLocationComponent },

            { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
            { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
            {
                path: 'member/edit',
                component: MemberEditComponent,
                resolve: { user: MemberEditResolver },
                canDeactivate: [PreventUnsavedChanges]
            },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
