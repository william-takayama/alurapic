import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable, BehaviorSubject } from 'rxjs';
import { PhotoComment } from '../photo/photo-comment';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit { 

    photo$: Observable<Photo>;
    photoId: number;
    public commentsCount: number = 0; 

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$
            .subscribe(
                () => {},
                err => { 
                    this.router.navigate(['not-found']);
                    console.log(err); 
                }
            );
        // const a = this.comments$.subscribe( res => res.length );
        // console.log(a);
    }

    remove() {
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(
                () => { 
                    this.alertService.success('Photo removed!', true);
                    this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true }); // replaceUrl = "destroy" url
                },
                err => {
                    console.log(err);
                    this.alertService.warning('Could not delete the photo!', true);
                }
                );
    }

    like(photo: Photo) { 
        this.photoService
            .like(photo.id)
            .subscribe(
                liked => {
                    if(liked){
                        this.photo$ = this.photoService.findById(photo.id);
                    }
                },
                err => {
                    console.log(err);
                    this.alertService.warning('Please, login first.', true);
                    this.router.navigate(['']);
                }
            );
    }

    updateCommentsCount() {
        this.commentsCount ++;
    }

    decreaseComment() {
        this.commentsCount = this.commentsCount -1;
    }
}