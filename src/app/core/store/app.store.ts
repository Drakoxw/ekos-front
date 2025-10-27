import { signalStore, withState } from '@ngrx/signals';

interface State {
  fullName: string;
  role: string;
  loggedIn: boolean;
  whastapp: string;
  linkedin: string;
  github: string;
}

const initialState: State = {
  loggedIn: false,
  fullName: 'Wilmar Roncancio M',
  role: 'Desarrollo Web - FullStack',
  whastapp: 'https://wa.me/573108018388',
  linkedin: 'https://www.linkedin.com/in/wilmar-roncancio-mendez-b344761bb/',
  github: 'https://github.com/Drakoxw',
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState)
);

