import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { AdvancedComponent } from './components/advanced/advanced.component';

const routes: Routes = [
    {
        path: '',
        component: IntroComponent
    },
    {
        path:'mini',
        component: HomeComponent
    },
    {
        path: 'advanced',
        component:AdvancedComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
