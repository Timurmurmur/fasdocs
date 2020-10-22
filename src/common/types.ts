import { NavigationProp, NavigationAction, ParamListBase as ParamList, PartialState, CommonActions } from '@react-navigation/native';
import { Action, State, EpicDeps } from '../../App';
import { Epic } from 'redux-observable';


export interface Navigation {
  dispatch(action: NavigationAction | ((state: any) => NavigationAction)): void;
  navigate<RouteName extends keyof ParamList>(...args: any): void;
  navigate<RouteName extends keyof ParamList>(route: any): void;
  reset(state: any): void;
  goBack(): void;
  isFocused(): boolean;
  canGoBack(): boolean;
  addListener(): void,
  closeDrawer(): void,
  dangerouslyGetParent(): void,
  dangerouslyGetState(): {},
  dispatch({type, target, payload, source}:NavigationAction): void,
  goBack(): void,
  isFocused(): boolean,
  jumpTo(name: string, params: object): void,
  navigate(name: string, params: object): void,
  openDrawer(): any,
  removeListener(listener: string): void,
  // reset(): void,
  // setOptions(): void,
  setParams(params: object): void,
  // Set params for current route
  // toggleDrawer(): void,
  // SOMETHING WITH CURRENT DRAWER
}
export interface Route {
  key: string;
  name: string;
  params: any | undefined;
}

export interface ComponentWithNavigation {
  navigation: Navigation;
  route: Route;
}


export type FuncEpic = Epic<Action, Action, State, EpicDeps>

export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function
    ? K
    : T[K] extends Function | undefined
    ? K
    : never;
}[keyof T];

export type TStateProps<T, TOwnProps = {}> = Pick<
  T,
  Exclude<NonFunctionPropertyNames<T>, NonFunctionPropertyNames<TOwnProps>>
>;
export type TDispatchProps<T, TOwnProps = {}> = Pick<
  T,
  Exclude<FunctionPropertyNames<T>, FunctionPropertyNames<TOwnProps>>
>;

export enum PageStatus {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR"
}


export type Items = Item[];

export interface Item {
  comment: string;
  id: string;
  image: string;
  name: string;
  position: number;
  price: number;
}

export type Categories = Category[];

export interface Category {
  id: string;
  items: [];
  name: string;
  position: number;
}


export interface Document {
  annotation: string;
  attachments: string;
  correspondents: Array<string>;
  docType: {
      id: number;
      name: string;
  };
  info: string;
  regDate: string;
  regNum: string;
  setViewed: string;
  state: number;
  title: null | Array<string>;
}

export interface DocAttachment {
  attachmentUid:	string;
  cachedPDF:	string;
  content:	string;
  fileUid:	string;
  isMain:	boolean;
  mD5:	string;
  name:	string;
  size:	number;
  version:	number;
  path: string;
}
export interface DocumentWithLoadedAtachments {
  annotation: string;
  attachments: Array<DocAttachment>;
  correspondents: Array<string>;
  docType: {
      id: number;
      name: string;
  };
  info: string;
  regDate: string;
  regNum: string;
  setViewed: string;
  state: number;
  title: null | Array<string>;
}