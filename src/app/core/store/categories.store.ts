import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Category } from '@interfaces/index';
import { computed, inject, InjectionToken } from '@angular/core';

type State = {
  categories: Category[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: State = {
  categories: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

const CATEGORY_TOKEN_STATE = new InjectionToken<State>('CategoryState', {
  factory: () => initialState,
});

export const CategoryStore = signalStore(
  { providedIn: 'root' },
   withState(initialState),
  withComputed(({ categories, filter }) => ({
    categoriesCount: computed(() => categories().length),
    sortedBooks: () => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return categories().sort((a, b) => {
        if (a.name > b.name) return 1 * direction;
        if (a.name < b.name) return -1 * direction;
        return 0;
      });
    },
  })),
  withMethods((store) => ({
    loading: () => {
      patchState(store, {
        categories: store.categories(),
        filter: store.filter(),
        isLoading: true,
      });
    },
    update: (data: Category[]) => {
      patchState(store, {
        categories: data,
        filter: store.filter(),
        isLoading: false,
      });
    },

  }))
);
