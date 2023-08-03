import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';

 import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    userName: string = "";
    isAdmin: boolean = false;
    isProfesor: boolean = false; //
    isDirectivo: boolean = false;
    usuario: string = "";

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private authService: AuthenticationService,
        private authGuard: AuthGuard) {

        

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {

        this.showSpinner=true
        // const user = this.authService.getCurrentUser();

        this.isAdmin = this.authService.isAdmin();
        this.userName = this.authService.getName();
        this.isProfesor=this.authService.isProfesor();
        this.isDirectivo=this.authService.isDirectivo();
        
        if(this.isAdmin){
            this.usuario= 'Administrador :';
        }
        else if(this.isProfesor){
            this.usuario='Profesor :';
        }
        else if(this.isDirectivo){
            this.usuario='Director/a :';
        }

       
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();

        setTimeout(() => {
            this.showSpinner=false
        }, 0);
    }
}
