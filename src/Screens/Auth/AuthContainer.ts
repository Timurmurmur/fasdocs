import { connect } from "react-redux";
import { Auth, IAuthProps } from "./Auth";
import { TDispatchProps, TStateProps } from "../../common/types";
import { login, loginRestore, setAuthByBiometric, setIsFirstOpen } from "./actions";
import { Dispatch } from "redux";
import { Action, State } from "../../../App";

interface OwnProps {
  navigation:any;
  route: any;
}

type StateProps = TStateProps<IAuthProps, OwnProps>;
type DispatchProps = TDispatchProps<IAuthProps, OwnProps>;

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  pageStatus: state.auth.pageStatus,
  blockMessage: state.auth.blockMessage,
  respError: state.auth.error,
  authByBiometric: state.auth.authByBiometric,
  cachedAuthData: state.auth.cachedAuthData,  
  data: state.auth.data,
  isFirstOpen: state.auth.isFirstOpen,
  hardwareStatus: state.auth.hardwareStatus
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    login: (phone: string, password: string) => {
      return dispatch(login(phone, password));
    },
    loginRestore: () => {
      return dispatch(loginRestore());
    },
    setAuthByBiometric: (data: boolean, hardwareStatus: number) => {
      return dispatch(setAuthByBiometric(data, hardwareStatus));
    },
    setIsFirstOpen: (data: boolean) => {
      return dispatch(setIsFirstOpen(data));
    }
  };
};

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);
