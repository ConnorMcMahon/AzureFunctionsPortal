import {Component, OnInit, EventEmitter, Input, Output} from 'angular2/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {TenantInfo} from '../models/tenant-info';
import {IBroadcastService, BroadcastEvent} from '../services/ibroadcast.service';
import {TutorialEvent, TutorialStep} from '../models/tutorial';

@Component({
    selector: 'top-bar',
    templateUrl: 'templates/top-bar.component.html',
    styleUrls: ['styles/top-bar.style.css'],
    inputs: ['isFunctionSelected']
})
export class TopBarComponent implements OnInit {
    @Input() gettingStarted: boolean;
    @Output() appSettingsClicked: EventEmitter<any>;
    @Output() monitorClicked: EventEmitter<any>;

    public user: User;
    public tenants: TenantInfo[];
    public currentTenant: TenantInfo;
    public inIFrame: boolean;
    public isAppSettingSelected: boolean;
    public isMonitorSelected: boolean;
    private _isFunctionSelected: boolean;

    constructor(private _userService: UserService,
                private _broadcastService: IBroadcastService) {

        this.appSettingsClicked = new EventEmitter<any>();
        this.monitorClicked = new EventEmitter<any>();
        this.inIFrame = this._userService.inIFrame;

        this._broadcastService.subscribe<TutorialEvent>(BroadcastEvent.TutorialStep, event => {
            if(event.step === TutorialStep.AppSettings){
                this.onAppSettingsClicked();
            }
        });
    }

    ngOnInit() {
        // nothing to do if we're running in an iframe
        if (this.inIFrame) return;

        this._userService.getUser()
            .subscribe((u) => {
                this.user = u
            });

        this._userService.getTenants()
            .subscribe(t => {
                this.tenants = t;
                this.currentTenant = this.tenants.find(e => e.Current);
            });
    }

    selectTenant(tenant: TenantInfo) {
        window.location.href = `api/switchtenants/${tenant.TenantId}`;
    }

    onAppSettingsClicked(){ 
        this.appSettingsClicked.emit(null);
        this.isAppSettingSelected = true;
    }

    onMonitorClicked(){ 
        this.monitorClicked.emit(null);
        this.isMonitorSelected = true;
    }

    set isFunctionSelected(selected : boolean){
        this._isFunctionSelected = selected;
        this.isAppSettingSelected = selected ? false : this.isAppSettingSelected;
        this.isMonitorSelected = selected ? false : this.isMonitorSelected;
    }

    get isFunctionSelected(){
        return this._isFunctionSelected;
    }

    onAzureFunctionClick() {
        this._broadcastService.broadcast(BroadcastEvent.GoToIntro);
    }
}