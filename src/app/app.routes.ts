import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidderDashboardComponent } from './components/bidder-dashboard/bidder-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'seller-dashboard',
        component: SellerDashboardComponent
    },

    {
        path: 'bidder-dashboard',
        component: BidderDashboardComponent
    },

];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class AppRoutesModule { }