import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { blackListValidator } from './black-list.validator';
import { fakeAsync, tick } from '@angular/core/testing';

describe('BlackList Validator', () => {
  const control: AbstractControl = {
    value: 'zzz',
  } as AbstractControl;

  const cdRef: ChangeDetectorRef = {
    markForCheck() {},
  } as ChangeDetectorRef;

  it('should blackListValidator', fakeAsync(() => {
    const httpClient: HttpClient = {
      get() {
        return of(true);
      },
    } as unknown as HttpClient;

    const asyncValidator = blackListValidator(httpClient, cdRef, 'xxx');
    const o = asyncValidator(control);
    if (!(o instanceof Observable)) {
      throw new Error('async val should be an observable');
    }

    o.subscribe((result) => {
      expect(result).toEqual(null);
    });

    tick(1000);
  }));

  it('should blackListValidator with negative result', fakeAsync(() => {
    const httpClient: HttpClient = {
      get() {
        return of(false);
      },
    } as unknown as HttpClient;

    const asyncValidator = blackListValidator(httpClient, cdRef, 'xxx');
    const o = asyncValidator(control);
    if (!(o instanceof Observable)) {
      throw new Error('async val should be an observable');
    }

    o.subscribe((result) => {
      expect(result).toEqual({ blackList: { blackListedWord: control.value } });
    });

    tick(1000);
  }));

  it('should blackListValidator with no backend (positive result)', fakeAsync(() => {
    const httpClient: HttpClient = {
      get() {
        return throwError(() => new Error());
      },
    } as unknown as HttpClient;

    const asyncValidator = blackListValidator(httpClient, cdRef, 'xxx');
    const o = asyncValidator(control);
    if (!(o instanceof Observable)) {
      throw new Error('async val should be an observable');
    }

    o.subscribe((result) => {
      expect(result).toEqual(null);
    });

    tick(1000);
  }));
});
