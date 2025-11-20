import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { UnknownRedirect } from './features/common-components/unknown-redirect/unknown-redirect';
import { LandingPage } from './features/home-component/landing-page/landing-page';
import { LearningTrack } from './features/home-component/learning-track/learning-track';
import { Specialization } from './features/home-component/specialization/specialization';
import { AwsCertification } from './features/home-component/aws-certification/aws-certification';
import { Forums } from './features/home-component/forums/forums';
import { Blog } from './features/home-component/blog/blog';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: LandingPage },
      { path: 'learning-track', component: LearningTrack },
      { path: 'specialization', component: Specialization },
      { path: 'mock-exams', component: AwsCertification },
      { path: 'forums', component: Forums },
      { path: 'blog', component: Blog },
      { path: 'awscertification', component: AwsCertification },
    ],
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./features/common-components/callback-page/callback-page').then(
        (m) => m.CallbackComponent
      ),
  },
  {
    path: '**',
    component: UnknownRedirect,
  },
];
