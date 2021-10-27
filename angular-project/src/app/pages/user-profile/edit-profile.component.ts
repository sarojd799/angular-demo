import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from 'app/services/backend/user.service';
import { UtilService } from 'app/services/backend/util.service';
import { RequiredFieldsMatchers } from 'app/services/util/material-form-validators.util';
import { SessionService } from 'app/services/util/session.service';
import { ToastrService } from 'app/services/util/toastr.utils';
import { UserDetailsManager } from 'app/services/util/user-details.manager';
import { ValidationUtils } from 'app/services/util/validation.service';
import { from, Observable, of } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { validationMessages } from './edit-profile/edit-profile.validation-messages';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('profileForm') profileForm!: NgForm;


  editProfileForm: FormGroup = this.fb.group({
    firstName: ['', [this._vu.nameValidator]],
    middleName: ['', [this._vu.nameValidator]],
    lastName: ['', [this._vu.nameValidator]],
    email: ['', [this._vu.required, this._vu.validEmail]],
    gender: [''],
    phone: ['', [this._vu.phoneValidator]],
    dob: [''],

    address: this.fb.group({
      country: [''],
      state: [''],
      city: [''],
      pincode: ['', [this._vu.pincodeValidator]],
      addressLine: ['']
    })
  })

  allCountries = []
  availableStates: any = []
  availableCities: any = []

  profileFormErrors: any = {};

  currentUser: any = {};

  filteredCountries: Observable<any> = of([]);
  filteredStates: Observable<any> = of([]);
  filteredCities: Observable<any> = of([])

  constructor(
    private fb: FormBuilder,
    private _vu: ValidationUtils,
    private _util: UtilService,
    private _userService: UserService,
    private _session: SessionService,
    private _toastr: ToastrService,
    private _userDetailsManager: UserDetailsManager) { }

  //===================================API_CALLS=======================================//

  getAllCountries() {
    this._util.getAllCountries().subscribe(res => {
      if (res && res.length) {
        this.allCountries = res;
        this.countryFormControl?.enable();
        if (this.currentUser && this.currentUser?.address?.country) {
          const country = res.find((c: any) => c.countryName === this.currentUser.address.country);
          this.getStatesOfCountry(country.countryId);
        }
      }
    })
  }

  getStatesOfCountry(countryId: number) {
    this._util.getAllStatesOfCountry(countryId).pipe(
      map(res => {
        this.availableStates = res;
        this.stateFormControl?.enable();
        if (this.currentUser && this.currentUser?.address?.state) {
          const state = res.find((s: any) => s.stateName === this.currentUser.address.state);
          if (state) {
            this.stateFormControl?.setValue(state.stateName);
            this.getCitiesOfState(state.stateId);
          }
        }
      })).subscribe();
  }

  getCitiesOfState(stateId: number) {
    this._util.getAllCitiesOfState(stateId).subscribe(res => {
      this.availableCities = res;
      this.cityFormControl?.enable();
    })
  }

  //====================================VALUE_CHANGES=======================================//

  onCountryValueChanges() {
    if (this.countryFormControl instanceof AbstractControl) {
      this.filteredCountries = this.countryFormControl.valueChanges.pipe(
        startWith(''),
        filter(v => typeof v === 'string'),
        map((val: string) => {
          return val ? this.allCountries.filter((rec: any) => rec.countryName.toLowerCase().indexOf(val.trim().toLowerCase()) === 0) : this.allCountries
        })
      )
    }
  }

  onStateValueChanges() {
    if (this.stateFormControl instanceof AbstractControl) {
      this.filteredStates = this.stateFormControl.valueChanges.pipe(
        startWith(''),
        filter(v => typeof v === 'string'),
        map((val: string) => {
          return val ? this.availableStates.filter((rec: any) => rec.stateName.toLowerCase().indexOf(val.trim().toLowerCase()) === 0) : this.availableStates
        })
      )
    }
  }

  onCityValueChanges() {
    if (this.cityFormControl instanceof AbstractControl) {
      this.filteredCities = this.cityFormControl.valueChanges.pipe(
        startWith(''),
        filter(v => typeof v === 'string'),
        map((val: string) => this.availableCities.filter((rec: any) => rec.cityName.toLowerCase().indexOf(val.trim().toLowerCase()) == 0))
      )
    }
  }


  registerFormValueChanges() {
    this.onCountryValueChanges();
    this.onStateValueChanges();
    this.onCityValueChanges();
    this.editProfileForm.valueChanges.subscribe(res => this.validateProfileForm(this.editProfileForm))
  }

  //=========================================================================================================//

  focus(type: string) {
    if (type === 'country') {
      this.filteredCountries = of(this.allCountries);
      this.onCountryValueChanges()
    } else if (type === 'state') {
      this.filteredStates = of(this.availableStates);
      this.onStateValueChanges();
    } else {
      this.filteredCities = of(this.filteredCities);
      this.onCityValueChanges();
    }
  }

  clearAddressFields(target: string) {

    this.cityFormControl?.setValue('');
    this.cityFormControl?.disable();
    this.stateFormControl?.setValue('');

    if (target === 'state') return;

    this.stateFormControl?.disable();
    this.countryFormControl?.setValue('');
  }

  validateCountry() {
    setTimeout(() => {
      if (this.countryFormControl?.value) {
        const country: any = this.allCountries.find((c: any) => c.countryName.toLowerCase().trim() === this.countryFormControl?.value.trim().toLowerCase())
        if (country) {
          this.countryFormControl.setValue(country.countryName);
          this.getStatesOfCountry(country.countryId);
          return;
        }
      }
      this.clearAddressFields('country');

    }, 1000)
  }

  validateState() {
    setTimeout(() => {
      if (this.stateFormControl?.value) {
        const state = this.availableStates.find((s: any) => s.stateName.toLowerCase().trim() === this.stateFormControl?.value.trim().toLowerCase())
        if (state) {
          this.stateFormControl?.setValue(state.stateName);
          this.getCitiesOfState(state.stateId);
          return
        }
      }
      this.clearAddressFields('state');
    }, 1000)
  }

  disableStateAndCity() {
    if (this.currentUser) {
      if ((this.currentUser && !this.currentUser?.address?.country) || !this.allCountries.length) {
        this.stateFormControl?.disable();
      }
      if ((this.currentUser && !this.currentUser?.address?.state) || !this.availableStates.length) {
        this.stateFormControl?.disable();
      }
      if ((this.currentUser && !this.currentUser?.address?.city) || !this.availableCities.length) {
        this.cityFormControl?.disable();
      }
      return;
    }
    this.stateFormControl?.disable();
    this.cityFormControl?.disable();
    this.countryFormControl?.disable();
  }

  validateProfileForm(group: FormGroup) {
    const controls = group.controls;
    Object.keys(controls).forEach((controlName: any) => {
      this.profileFormErrors[controlName] = '';
      const control = group.get(controlName);

      if (control instanceof FormControl && control.invalid) {
        for (const errorKey in control.errors) {
          const msgNode = Reflect.get(validationMessages, controlName);
          if (msgNode && msgNode[errorKey])
            this.profileFormErrors[controlName] = msgNode[errorKey];
        }
      } else if (control instanceof FormGroup) {
        if (control.invalid) {
          const msgNode = Reflect.get(validationMessages, controlName)
          for (const groupErrorKey in control.errors)
            this.profileFormErrors[controlName] = msgNode[groupErrorKey] || '';
        }
        this.validateProfileForm(control);
      }
    })

  }
  //======================================================================================================

  fetchComponentData() {
    this.getAllCountries();
    const user = this._session.getUserDetails();
    if (user) {
      this.currentUser = user;
      this.editProfileForm.patchValue(user);
    }
  }


  ngOnInit(): void {
    this.fetchComponentData();
    this.disableStateAndCity();
    this.registerFormValueChanges();
  }


  updateProfile(editForm: FormGroup) {

    if (this.editProfileForm.pristine) {
      this._toastr.info("Nothing to update")
    } else if (editForm.invalid) {
      this.validateProfileForm(editForm);
      this._toastr.info("some field values are invalid")
    } else {
      this.updateUserInfo();
    }
  }

  //convert payload address before sending back to backend
  updateUserInfo() {
    const user = this._session.getUserDetails();
    if (user && user.userDetailsId) {
      const payload = {
        userDetailsId: user.userDetailsId,
        ...this.editProfileForm.value
      }
      this._userService.updateUserInfo(user.userDetailsId, payload).subscribe(res => {
        if (res && res.email) {
          this._toastr.success('Profile updated successfully')
        } else {
          this._toastr.error("Error occurred while updating profile")
        }
      }, err => this._toastr.error("Error occurred while updating profile"))
    }

  }



  get countryFormControl() { return this.editProfileForm.get('address')?.get('country') }
  get stateFormControl() { return this.editProfileForm.get('address')?.get('state') }
  get cityFormControl() { return this.editProfileForm.get('address')?.get('city') }

}
