import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LayoutResolver } from './layout.resolver';
import { AppState } from './shared/state';

describe('LayoutResolver', () => {
  let resolver: LayoutResolver;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideMockStore({}),
    });
    store = TestBed.inject(MockStore);
    resolver = TestBed.inject(LayoutResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve', () => {
    resolver.resolve().subscribe((layout) => expect(layout).toBeTruthy());
  });
});
